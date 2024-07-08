"use client"

import { SessionProvider } from 'next-auth/react'

const ProviderG = ({children, session}) => {
  return (
    <SessionProvider>
    {children}
      
    </SessionProvider>
  )
}

export default ProviderG
