'use client'
import { ReactNode } from 'react'
import { Hydrate } from 'react-query'

import ToasterContainer from '@components/ToasterContainer/ToasterContainer'
import { WaitForRouter } from '@components/WaitForRouter'

import AuthContextProvider from '@context/Auth/AuthContext'

import ReactQueryWrapper from '../../react-query/ReactQueryWrapper'

const RootClientWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryWrapper>
      <AuthContextProvider>
        <Hydrate>
          <ToasterContainer />
          <WaitForRouter>{children}</WaitForRouter>
        </Hydrate>
      </AuthContextProvider>
    </ReactQueryWrapper>
  )
}

export default RootClientWrapper
