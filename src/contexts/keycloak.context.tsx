import {
  AuthProviderProps,
  AuthProvider as KeycloakAuthProvider,
} from 'react-oidc-context'
import { WebStorageStateStore } from 'oidc-client-ts'
import { FC, ReactNode } from 'react'

type KeycloakContextProps = {
  children: ReactNode
}

const oidcConfig: AuthProviderProps = {
  authority: `${import.meta.env.VITE_KEYCLOAK_ISSUER}`,
  client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  redirect_uri: window.location.href,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  onSigninCallback: (): void => {
    window.history.replaceState({}, document.title, window.location.pathname)
  },
  post_logout_redirect_uri: import.meta.env.VITE_KEYCLOAK_REDIRECT_URI,
  metadata: {
    issuer: `${import.meta.env.VITE_KEYCLOAK_ISSUER}`,
    authorization_endpoint: `${import.meta.env.VITE_KEYCLOAK_ISSUER}/protocol/openid-connect/auth`,
    token_endpoint: `${import.meta.env.VITE_KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
    introspection_endpoint: `${import.meta.env.VITE_KEYCLOAK_ISSUER}/protocol/openid-connect/token/introspect`,
    userinfo_endpoint: `${import.meta.env.VITE_KEYCLOAK_ISSUER}/protocol/openid-connect/userinfo`,
    end_session_endpoint: `${import.meta.env.VITE_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`,
    jwks_uri: `${import.meta.env.VITE_KEYCLOAK_ISSUER}/protocol/openid-connect/certs`,
    check_session_iframe: `${import.meta.env.VITE_KEYCLOAK_ISSUER}/protocol/openid-connect/login-status-iframe.html`,
    registration_endpoint: `${import.meta.env.VITE_KEYCLOAK_ISSUER}/clients-registrations/openid-connect`,
    revocation_endpoint: `${import.meta.env.VITE_KEYCLOAK_ISSUER}/protocol/openid-connect/revoke`,
  },
}

export const KeycloakContext: FC<KeycloakContextProps> = ({ children }) => {
  console.log(oidcConfig)
  return <KeycloakAuthProvider {...oidcConfig}>{children}</KeycloakAuthProvider>
}
