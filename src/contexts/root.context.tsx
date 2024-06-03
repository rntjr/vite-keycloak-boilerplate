import { RouterContext } from './router.context.tsx'
import { KeycloakContext } from './keycloak.context.tsx'

export const RootContext = () => {
  return (
    <KeycloakContext>
      <RouterContext />
    </KeycloakContext>
  )
}
