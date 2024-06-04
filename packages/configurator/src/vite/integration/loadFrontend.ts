import { Integration } from '../../config'
import type { IntegrationInfo } from '../loader'

/**
 * Initialize frontend information.
 *
 * @author Zero <zero@naily.cc>
 * @date 2024/06/02
 * @export
 * @param {IntegrationInfo[]} integrations The integrations
 * @return {[
 *   Integration.ConfigureFrontend.Route[],
 *   Integration.ConfigureFrontend.AppBar[],
 *   Integration.ConfigureFrontend.StatusBar[],
 * ]} The frontend information.
 */
export function initFrontend(
  integrations: IntegrationInfo[],
): [
    Integration.ConfigureFrontend.FrontendRoute[],
    Integration.ConfigureFrontend.AppBar[],
    Integration.ConfigureFrontend.StatusBar[],
  ] {
  const routes: Integration.ConfigureFrontend.FrontendRoute[] = []
  const appBars: Integration.ConfigureFrontend.AppBar[] = []
  const statusBars: Integration.ConfigureFrontend.StatusBar[] = []

  for (const integration of integrations) {
    if (!integration.integration.configureFrontend)
      continue

    const ctx = new Integration.ConfigureFrontend.Context(integration)
    integration.integration.configureFrontend(ctx)
    // eslint-disable-next-line dot-notation
    routes.push(...ctx['_routes'])
    // eslint-disable-next-line dot-notation
    appBars.push(...ctx['_appBars'])
    // eslint-disable-next-line dot-notation
    statusBars.push(...ctx['_statusBars'])
  }
  return [routes, appBars, statusBars]
}
