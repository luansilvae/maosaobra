import React from 'react'
import Router from 'next/router'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'next-auth/client'

import GlobalStyle from '../styles/global'
import light from '../styles/themes/light'

import NProgress from 'nprogress'
import Navbar from '../components/Navbar'

Router.events.on('routeChangeStart', url => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={light}>
        <Navbar />
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
