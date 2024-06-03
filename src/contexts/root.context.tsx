import { FC, ReactNode } from 'react'
import { RouterContext } from './router.context.tsx'

type RootContextProps = {
  children: ReactNode
}

export const RootContext: FC<RootContextProps> = () => {
  return <RouterContext />
}
