'use client'
import { createContext, ReactNode, useState } from 'react'
import { getCookie } from 'cookies-next'

export const AuthContext = createContext<any>(null)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<any>(!!getCookie('User') || null)

  return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>
}

export default AuthProvider
