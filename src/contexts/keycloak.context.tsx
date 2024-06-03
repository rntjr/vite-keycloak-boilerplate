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
  authority: `${process.env.REACT_APP_KEYCLOAK_ISSUER}`,
  client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  redirect_uri: window.location.href,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  onSigninCallback: (): void => {
    window.history.replaceState({}, document.title, window.location.pathname)
  },
  post_logout_redirect_uri: process.env.REACT_APP_KEYCLOAK_REDIRECT_URI,
  metadata: {
    issuer: `${process.env.REACT_APP_KEYCLOAK_URL}`,
    authorization_endpoint: `${process.env.REACT_APP_KEYCLOAK_URL}/protocol/openid-connect/auth`,
    token_endpoint: `${process.env.REACT_APP_KEYCLOAK_URL}/protocol/openid-connect/token`,
    introspection_endpoint: `${process.env.REACT_APP_KEYCLOAK_URL}/protocol/openid-connect/token/introspect`,
    userinfo_endpoint: `${process.env.REACT_APP_KEYCLOAK_URL}/protocol/openid-connect/userinfo`,
    end_session_endpoint: `${process.env.REACT_APP_KEYCLOAK_URL}/protocol/openid-connect/logout`,
    jwks_uri: `${process.env.REACT_APP_KEYCLOAK_URL}/protocol/openid-connect/certs`,
    check_session_iframe: `${process.env.REACT_APP_KEYCLOAK_URL}/protocol/openid-connect/login-status-iframe.html`,
    registration_endpoint: `${process.env.REACT_APP_KEYCLOAK_URL}/clients-registrations/openid-connect`,
    revocation_endpoint: `${process.env.REACT_APP_KEYCLOAK_URL}/protocol/openid-connect/revoke`,
  },
}

export const KeycloakContext: FC<KeycloakContextProps> = ({ children }) => (
  <KeycloakAuthProvider {...oidcConfig}>{children}</KeycloakAuthProvider>
)
