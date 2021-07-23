import React from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { RiMapPinLine } from 'react-icons/ri'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import Loading from '../../components/Loading'
import NotLoggedPage from '../../components/NotLoggedPage'
import capitalizeString from '../../utils/capitalizeString'

import Container, { UsersList, Pagination } from './styles'

interface User {
  _id: string
  name: string
  email: string
  image: string
  city: string
  neighborhood: string
  phone: string
  state: string
  cnpj: string
  description: string
  especialidades: string[]
  experience: number
  professional: boolean
}

interface UserProps {
  users: User[]
  page: number
  maxPage: number
  total: number
  especialidade: string | string[]
  city: string | string[]
}

export default function Search({
  users,
  page,
  maxPage,
  total,
  city,
  especialidade
}: UserProps) {
  const [session, loading] = useSession()

  return (
    <div>
      <Head>
        <title>Mãos à Obra | Início</title>
      </Head>

      {loading ? (
        <Loading />
      ) : !session ? (
        <NotLoggedPage />
      ) : (
        <div>
          {users.length < 1 ? (
            <Container>
              <div className="found-professionals">
                <span>Nenhum profissional encontrado</span>
              </div>
            </Container>
          ) : (
            <Container>
              <div className="found-professionals">
                <span>Profissionais encontrados: {total}</span>
              </div>

              <UsersList>
                {users.map(user => {
                  return (
                    <div className="card-user" key={user._id}>
                      <div className="user-data-content">
                        <Image
                          width={360}
                          height={360}
                          alt="User Avatar"
                          src={user.image}
                        />

                        <div className="user-info">
                          <Link href={`/professional/${user._id}`}>
                            <h1>{capitalizeString(user.name)}</h1>
                          </Link>

                          <span>
                            <RiMapPinLine size={22} /> {user.city} -{' '}
                            {user.state}
                          </span>
                        </div>
                      </div>

                      <span>{user.description}</span>

                      <div className="description">
                        {user.especialidades &&
                          user.especialidades.map(item => (
                            <span key={item}>{item}</span>
                          ))}
                      </div>
                    </div>
                  )
                })}
              </UsersList>
              <Pagination>
                <div className="actions">
                  <button
                    onClick={() =>
                      Router.push(
                        `/search/?city=${city}&especialidade=${especialidade}&page=${
                          page - 1
                        }`
                      )
                    }
                    disabled={page <= 1}
                  >
                    <FaArrowLeft /> Anterior
                  </button>
                  <button
                    onClick={() =>
                      Router.push(
                        `/search/?city=${city}&especialidade=${especialidade}&page=${
                          page + 1
                        }`
                      )
                    }
                    disabled={page >= maxPage}
                  >
                    Próxima <FaArrowRight />
                  </button>
                </div>
              </Pagination>
            </Container>
          )}
        </div>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const currentPage: string | string[] | number = query.page || 1
  const especialidade: string | string[] = query.especialidade
  const city: string | string[] = query.city

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/professionals?city=${city}&especialidade=${especialidade}&page=${currentPage}`
  )
  const data: UserProps = await res.json()

  const { users, page, maxPage, total } = data

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: { users, page, maxPage, total, city, especialidade }
  }
}
