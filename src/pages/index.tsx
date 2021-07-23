import React, { FormEvent, useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import { useSession } from 'next-auth/client'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { RiMapPinLine } from 'react-icons/ri'

import Loading from '../components/Loading'
import capitalizeString from '../utils/capitalizeString'
import { listaEspecialidades } from '../utils/especialidades'

import {
  Container,
  LandingContainer,
  SearchContainer,
  Welcome,
  UsersList,
  Pagination
} from '../styles/home'

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
}

export default function Home({ users, page, maxPage, total }: UserProps) {
  const [session, loading] = useSession()
  const [city, setCity] = useState('')
  const [especialidade, setEspecialidade] = useState('')

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    Router.push(`/search/?city=${city}&especialidade=${especialidade}`)
  }

  return (
    <div>
      <Head>
        <title>Mãos à Obra | Início</title>
      </Head>

      {loading ? (
        <Loading />
      ) : !session ? (
        <LandingContainer>
          <Welcome>
            <h1>Bem-vindo ao Mãos à Obra </h1>
            <h2>Encontre o prestador de serviços mais próximo de você.</h2>

            {!session && (
              <Link href="/signin">
                <a>
                  Cadastre-se para começar a procurar <FaArrowRight />
                </a>
              </Link>
            )}
          </Welcome>

          <Image
            alt="Mãos à Obra Logo"
            src="/illustration.svg"
            width={600}
            height={450}
          />
        </LandingContainer>
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
              <SearchContainer>
                <div className="search">
                  <h1>Encontre um prestador de serviço</h1>

                  <form className="search-box" onSubmit={handleSearch}>
                    <input
                      type="text"
                      placeholder="Cidade"
                      required
                      onChange={event => {
                        setCity(capitalizeString(event.target.value.trim()))
                      }}
                    />

                    <select
                      onChange={event => {
                        setEspecialidade(event.target.value)
                      }}
                      required
                    >
                      <option style={{ display: 'none' }} value="">
                        Especialidades
                      </option>
                      {listaEspecialidades.map(especialidade => (
                        <option
                          value={especialidade.value}
                          key={especialidade.label}
                        >
                          {especialidade.label}
                        </option>
                      ))}
                    </select>
                    <button type="submit">Procurar</button>
                  </form>
                </div>

                <div className="illustration">
                  <Image
                    alt="Mãos à Obra Logo"
                    src="/illustration.svg"
                    width={600}
                    height={450}
                  />
                </div>
              </SearchContainer>

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
                    onClick={() => Router.push(`/?page=${page - 1}`)}
                    disabled={page <= 1}
                  >
                    <FaArrowLeft /> Anterior
                  </button>
                  <button
                    onClick={() => Router.push(`/?page=${page + 1}`)}
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

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users?page=${currentPage}`
  )
  const data: UserProps = await res.json()

  const { users, page, maxPage, total } = data

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: { users, page, maxPage, total }
  }
}
