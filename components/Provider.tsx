import { SessionProvider } from 'next-auth/react'
import React from 'react'

type Props = {
  children: React.ReactNode,
  session?: any
}
function Provider({ children, session }: Props) {

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Provider