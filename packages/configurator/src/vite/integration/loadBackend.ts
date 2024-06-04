import type { Server } from 'socket.io'
import { Integration } from '../../config'
import type { IntegrationInfo } from '../loader'

interface InitBackendRouterReturn
  extends Integration.ConfigureBackend.BackendRoute {
  integrationName: string
  isInternal?: true
}

/**
 * Initialize backend router.
 *
 * @author Zero <zero@naily.cc>
 * @export
 * @param {IntegrationInfo[]} integrations The integrations
 * @return {Integration.ConfigureBackend.Route[]} The backend routes
 */
export function initBackendRouter(
  integrations: IntegrationInfo[],
  io: Server,
): InitBackendRouterReturn[] {
  const routes: InitBackendRouterReturn[] = []
  for (const integration of integrations) {
    if (!integration.integration.configureBackend)
      continue

    const ctx = new Integration.ConfigureBackend.Context(
      io.of(`/${integration.name}`),
    )
    integration.integration.configureBackend(ctx)

    routes.push(
      ...ctx._routes.map(
        route =>
          ({
            ...route,
            integrationName: integration.name,
            isInternal: integration.isInternal,
          } as InitBackendRouterReturn),
      ),
    )
  }
  return routes
}
