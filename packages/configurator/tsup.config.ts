import { defineConfig } from 'tsup'
import { copyVueFiles } from './src/vite/copyVueFiles'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    config: 'src/config/index.ts',
    vite: 'src/vite/index.ts',
    cli: 'src/cli.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  async onSuccess() {
    copyVueFiles('src', 'dist')
  },
})
