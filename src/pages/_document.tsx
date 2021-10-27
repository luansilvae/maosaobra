import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps
} from 'next/document'

import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="application-name" content="Mãos à Obra" />
          <meta
            name="description"
            content="Encontre o prestador de serviços mais próximo de você."
          />

          <meta property="og:type" content="website" />
          <meta property="og:title" content="Mãos à Obra" />
          <meta
            property="og:description"
            content="Encontre o prestador de serviços mais próximo de você."
          />
          <meta property="og:site_name" content="Mãos à Obra" />
          <meta property="og:url" content="https://maosaobra.vercel.app" />
          <meta
            property="og:image"
            content="https://maosaobra.vercel.app/logo.svg"
          />

          <meta httpEquiv="Content-Language" content="pt-br" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
            rel="stylesheet"
          />

          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
          <link rel="manifest" href="/manifest.json" />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
