import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import * as Yup from 'yup'
import { useSession } from 'next-auth/client'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { RiMapPinLine } from 'react-icons/ri'
import { TiWarning } from 'react-icons/ti'

import CustomSelect from '../components/CustomSelect'
import Loading from '../components/Loading'
import capitalizeString from '../utils/capitalizeString'
import { listaEspecialidades } from '../utils/especialidades'

import {
  Container,
  LandingContainer,
  SearchContainer,
  UsersList,
  Pagination,
  FoundProfessionals
} from '../styles/home'

interface User {
  _id: string
  name: string
  image: string
  description: string
  especialidades: string[]
  address: {
    state: string
    city: string
  }
}

interface UserProps {
  users: User[]
  page: number
  maxPage: number
  total: number
  url: string
}

export default function Home({ users, page, maxPage, total, url }: UserProps) {
  const [session, loading] = useSession()

  const [city, setCity] = useState('')
  const [especialidade, setEspecialidade] = useState('')

  const validateSearch = Yup.object({
    city: Yup.string().nullable(),
    especialidade: Yup.string().required('Selecione uma especialidade.')
  })

  return (
    <div>
      <Head>
        <title>Mãos à Obra | Início</title>
      </Head>

      {loading ? (
        <Loading />
      ) : !session ? (
        <LandingContainer>
          <div className="welcome">
            <h1>Bem-vindo ao Mãos à Obra </h1>
            <h2>Encontre o prestador de serviços mais próximo de você.</h2>

            {!session && (
              <Link href="/signin">
                <a>
                  Cadastre-se para começar a procurar <FaArrowRight />
                </a>
              </Link>
            )}
          </div>

          <Image
            alt="Mãos à Obra Logo"
            src="/illustration.svg"
            width={600}
            height={450}
          />
        </LandingContainer>
      ) : (
        <Container>
          <SearchContainer>
            <div className="search">
              <h1>Encontre um prestador de serviço</h1>

              <Formik
                enableReinitialize={false}
                initialValues={{ city, especialidade }}
                validationSchema={validateSearch}
                onSubmit={values => {
                  const { city, especialidade } = values

                  setCity(capitalizeString(city.trim()))
                  setEspecialidade(especialidade)

                  const searchEspecialidade = especialidade
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')

                  const searchCity = capitalizeString(city.trim())
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')

                  Router.push(
                    city
                      ? `?city=${searchCity}&especialidade=${searchEspecialidade}`
                      : `?especialidade=${searchEspecialidade}`
                  )
                }}
              >
                {formik => {
                  const { errors, touched, isValid } = formik

                  return (
                    <Form className="search-box">
                      <div
                        className={
                          errors.city && touched.city ? 'error input' : 'input'
                        }
                      >
                        <Field id="city" name="city" placeholder="Cidade" />

                        {errors.city && touched.city ? (
                          <div className="error-message">
                            <TiWarning size={21} />
                            {errors.city}
                          </div>
                        ) : null}
                      </div>

                      <div
                        className={
                          errors.especialidade && touched.especialidade
                            ? 'error input'
                            : 'input'
                        }
                      >
                        <Field
                          name="especialidade"
                          className="custom-select"
                          options={listaEspecialidades}
                          component={CustomSelect}
                          instanceId="especialidade"
                          placeholder="Especialidade"
                        />

                        {errors.especialidade && touched.especialidade ? (
                          <div className="error-message">
                            <TiWarning size={21} />
                            {errors.especialidade}
                          </div>
                        ) : null}
                      </div>

                      <button type="submit" disabled={!isValid}>
                        Procurar
                      </button>
                    </Form>
                  )
                }}
              </Formik>
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
          {users.length < 1 ? (
            <FoundProfessionals>
              {!city && !especialidade ? (
                <div>
                  <h3>Infelizmente nenhum profissional foi encontrado.</h3>
                  <span>Tente buscar por um outro termo de pesquisa.</span>
                </div>
              ) : !city ? (
                <div>
                  <h3>
                    Resultados para: <span>{especialidade}</span>
                  </h3>
                  <span>Infelizmente não encontramos nenhum profissional.</span>
                </div>
              ) : (
                <div>
                  <h3>
                    Resultados para: <span>{especialidade}</span> em{' '}
                    <span>{city}</span>
                  </h3>
                  <span>Infelizmente não encontramos nenhum profissional.</span>
                </div>
              )}
            </FoundProfessionals>
          ) : (
            <>
              <FoundProfessionals>
                {!city && !especialidade ? (
                  <div>
                    <h3>Estes são os profissionais mais recentes.</h3>
                    <span>Profissionais encontrados: {total}</span>
                  </div>
                ) : !city ? (
                  <div>
                    <h3>
                      Resultados para: <span>{especialidade}</span>
                    </h3>
                    <span>Profissionais encontrados: {total}</span>
                  </div>
                ) : (
                  <div>
                    <h3>
                      Resultados para: <span>{especialidade}</span> em{' '}
                      <span>{city}</span>
                    </h3>
                    <span>Profissionais encontrados: {total}</span>
                  </div>
                )}
              </FoundProfessionals>

              <UsersList>
                {users.map(user => {
                  return (
                    <Link href={`/professional/${user._id}`}>
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
                              <RiMapPinLine size={22} /> {user.address.city} -{' '}
                              {user.address.state}
                            </span>
                          </div>
                        </div>

                        <span>
                          {user.description.length > 100
                            ? user.description.substring(0, 100) + '...'
                            : user.description}
                        </span>

                        <div className="specialties">
                          {user.especialidades &&
                            user.especialidades.map(item => (
                              <span key={item}>{item}</span>
                            ))}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </UsersList>
              <Pagination>
                <div className="actions">
                  <button
                    onClick={() => Router.push(`${url}page=${page - 1}`)}
                    disabled={page <= 1}
                  >
                    <FaArrowLeft /> Anterior
                  </button>
                  <button
                    onClick={() => Router.push(`${url}page=${page + 1}`)}
                    disabled={page >= maxPage}
                  >
                    Próxima <FaArrowRight />
                  </button>
                </div>
              </Pagination>
            </>
          )}
        </Container>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async req => {
  const currentPage: string | string[] | number = req.query.page || 1
  const especialidade: string | string[] = req.query.especialidade
  const city: string | string[] = req.query.city

  let res: Response
  let url: string

  if (especialidade || city) {
    res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/professionals?city=${city}&especialidade=${especialidade}&page=${currentPage}`
    )

    url = city
      ? `?city=${city}&especialidade=${especialidade}&`
      : `?especialidade=${especialidade}&`
  } else {
    res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/users?page=${currentPage}`
    )
    url = '/?'
  }

  const data: UserProps = await res.json()

  const { users, page, maxPage, total } = data

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: { users, page, maxPage, total, url }
  }
}
