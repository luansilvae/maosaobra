import { useSession } from 'next-auth/client'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Loading from '../Loading'
import Logo from '../Logo'

import { Container } from './styles'

const NotLoggedPage: React.FC = () => {
  const [session, loading] = useSession()

  return (
    <>
      <Head>
        <title>Mãos à Obra | Faça login</title>
      </Head>
      {loading ? (
        <Loading />
      ) : (
        !session && (
          <Container>
            <div>
              <div className="image">
                <Link href="/">
                  <a>
                    <Logo />
                  </a>
                </Link>
              </div>
              <h2>Ops.. você precisa estar logado para acessar essa página</h2>
              <Link href="/signin">
                <a className="signin">Fazer login</a>
              </Link>
            </div>
          </Container>
        )
      )}
    </>
  )
}

export default NotLoggedPage
