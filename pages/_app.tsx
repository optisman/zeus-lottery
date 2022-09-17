import React from 'react'
import type { AppProps } from 'next/app'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from 'utils/web3React'
import { Provider } from 'react-redux'
import store from 'state'
import { ModalProvider } from 'widgets/Modal'
import '../styles/globals.css'
import './styles1.css'

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ModalProvider>
          <AnyComponent {...pageProps} />
        </ModalProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default MyApp
