import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { hasAuthParams, useAuth } from 'react-oidc-context'
import { useEffect, useState } from 'react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
])

export const RouterContext = () => {
  const auth = useAuth()
  const [hasTriedSignin, setHasTriedSignin] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      if (
        !hasAuthParams() &&
        !auth.isAuthenticated &&
        !auth.activeNavigator &&
        !auth.isLoading &&
        !hasTriedSignin
      ) {
        await auth.signinRedirect()
        setHasTriedSignin(true)
      }
    })()
  }, [auth, hasTriedSignin])

  if (auth.isLoading) {
    return <div>Loading...</div>
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>
  }

  return <RouterProvider router={router} />
}
