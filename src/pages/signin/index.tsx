import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'
import { FcGoogle } from 'react-icons/fc'
import { SiLinkedin } from 'react-icons/si'

import Loading from '../../components/Loading'

import Container, { LoginBoxBrand, LoginBox, LoginOptions } from './styles'

export default function SignIn({ children }) {
  const [session, loading] = useSession()

  const router = useRouter()

  if (session) {
    router.push('/')
  }

  return (
    <div>
      <Head>
        <title>Mãos à Obra | Entrar</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>

      {loading ? (
        <Loading />
      ) : (
        !session && (
          <Container>
            <LoginBoxBrand>
              <h1>Mãos à Obra</h1>
              <h2>
                Faça login para encontrar os prestadores de serviços próximo a
                você
              </h2>
            </LoginBoxBrand>
            <LoginBox>
              <h2>Fazer login</h2>
              <h3>Como deseja continuar?</h3>

              <LoginOptions>
                <button
                  onClick={() =>
                    signIn('linkedin', {
                      callbackUrl: '/signin',
                      redirect: true
                    })
                  }
                >
                  <SiLinkedin size={28} className="linkedin" /> Continuar com
                  LinkedIn
                  <span></span>
                </button>

                <button
                  onClick={() =>
                    signIn('google', {
                      callbackUrl: '/signin',
                      redirect: true
                    })
                  }
                >
                  <FcGoogle size={28} /> Continuar com Google <span></span>
                </button>
              </LoginOptions>
              {children}
            </LoginBox>
          </Container>
        )
      )}
    </div>
  )
}
