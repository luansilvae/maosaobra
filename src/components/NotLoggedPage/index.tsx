import { useSession } from 'next-auth/client'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Loading from '../Loading'

import Container from './styles'

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
            <div className="unauthorized-page">
              <h1>401.</h1>
              <h2>Oops! Algo deu errado :(</h2>
              <span>Você precisa estar logado para acessar essa página.</span>
              <Link href="/signin">
                <a>Fazer login</a>
              </Link>
            </div>
          </Container>
        )
      )}
    </>
  )
}

export default NotLoggedPage
