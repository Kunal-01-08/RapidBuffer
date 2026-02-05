"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'

const SessionProviderWrapper = ({children}) => {
  return (
    <div >

        <SessionProvider >{children}</SessionProvider>
    </div>
  )
}

export default SessionProviderWrapper
