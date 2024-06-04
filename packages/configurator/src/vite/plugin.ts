import { join } from 'node:path'
import { cwd } from 'node:process'
import { existsSync } from 'node:fs'
import type { Plugin, PluginOption } from 'vite'
import VueConfigurableRouter from 'vite-plugin-vue-configurable-router'
import { match } from 'path-to-regexp'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { Server } from 'socket.io'
import { presetIcons, presetTypography, presetUno } from 'unocss'
import UnoCSS from 'unocss/vite'
import { generateComponentField } from '../utils'
import { Home } from '../internal/home/home'
import { Package } from '../internal/package/package'
import { addIntegration, loadAllIntegrations } from './loader'
import { initFrontend } from './integration/loadFrontend'
import { initBackendRouter } from './integration/loadBackend'

let __dirname: string
if (typeof globalThis.__dirname === 'undefined')
  __dirname = new URL('.', import.meta.url).pathname

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var __UNCLI_ROOT_DIR__: string
}

export default async function Configurator(): Promise<
  (Plugin<any> | PluginOption)[]
> {
  globalThis.__UNCLI_ROOT_DIR__ = existsSync(
    join(cwd(), '.configure/frontend/index.html'),
  )
    ? join(cwd(), '.configure/frontend')
    : join(__dirname, '../client')

  const integrations = await loadAllIntegrations()
  let io: Server

  // Add internal integrations
  addIntegration(integrations, {
    name: 'unconfigurator-integration-internal:home',
    integration: Home,
  }).addIntegration(integrations, {
    name: 'unconfigurator-integration-internal:package',
    integration: Package,
  })

  const [frontendRoutes, frontendAppBar] = initFrontend(integrations)

  return [
    VueConfigurableRouter({ routes: frontendRoutes }),
    AutoImport({
      dirs: [
        join(__dirname, '../frontend/src/composables'),
        join(cwd(), './.configure/frontend/src/composables'),
      ],
      include: [/[\\/]node_modules[\\/]/],
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        {
          from: 'naive-ui',
          imports: [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
            'useModal',
          ],
        },
      ],
      dts: join(cwd(), './.configure/frontend/auto-imports.d.ts'),
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      include: [/[\\/]node_modules[\\/]/],
      dirs: [
        join(__dirname, '../frontend/src/components'),
        join(cwd(), './.configure/frontend/src/components'),
      ],
      dts: join(cwd(), './.configure/frontend/components.d.ts'),
    }),
    UnoCSS({
      presets: [presetUno(), presetIcons(), presetTypography()],
      content: {
        pipeline: {
          include: [
            /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|ts)($|\?)/,
          ],
        },
        inline: [
          JSON.stringify(frontendAppBar),
          JSON.stringify(frontendRoutes),
        ],
      },
    }),
    {
      name: 'vite-plugin-unconfigurator',
      apply: 'serve',
      resolveId(id) {
        if (id === 'virtual:unconfigurator/menu')
          return id
      },
      load(id) {
        if (id === 'virtual:unconfigurator/menu')
          return `export default ${generateComponentField(frontendAppBar)}`
      },
      async configureServer(server) {
        io = new Server(server.httpServer)

        const backendRoutes = initBackendRouter(integrations, io)
        for (const route of backendRoutes) {
          server.middlewares.use(async (req, res, next) => {
            if (
              match(
                join('/_unconfigurator', route.integrationName, route.path),
              )(req.url)
              && route.method.toLowerCase() === req.method.toLowerCase()
            )
              await route.handler(req, res, next)
            else next()
          })
        }
      },
    },
  ]
}
