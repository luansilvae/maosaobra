import { ObjectId } from 'bson'
import { GetStaticPaths, GetStaticProps } from 'next'
import { mutate as mutateGlobal } from 'swr'
import { useSession } from 'next-auth/client'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineMail } from 'react-icons/hi'
import { BiEditAlt, BiCalendar } from 'react-icons/bi'
import { IoHeart, IoHeartDislike } from 'react-icons/io5'
import {
  RiMapPinLine,
  RiPhoneFill,
  RiShieldUserLine,
  RiWhatsappFill
} from 'react-icons/ri'
import { useFetch } from '../../hooks/useFetch'
import { connect } from '../../utils/database'

import { parseISO, format, formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import Container from './styles'
import NotLoggedPage from '../../components/NotLoggedPage'
import axios from 'axios'
import { useCallback } from 'react'

interface User {
  _id: string
  name: string
  email: string
  image: string
  address: {
    city: string
    neighborhood: string
    state: string
  }
  phone: string
  description: string
  especialidades: string[]
  experience: number
  createdAt: Date
}

export default function Professional({ user }) {
  const professional: User = JSON.parse(user)

  const [session] = useSession()

  const { data, mutate } = useFetch(`/api/user/${session?.user.email}`)

  const handleFavorites = useCallback(
    (
      professionalId: string,
      professionalName: string,
      professionalImage: string,
      userId: string
    ) => {
      const favoriteData = {
        professionalId,
        professionalName,
        professionalImage,
        userId
      }

      axios.put(`/api/favorite`, favoriteData)

      const updatedUser = {
        ...data,
        favorites: [{ professionalId, professionalName, professionalImage }]
      }

      mutateGlobal(`/api/user/${session?.user.email}`, updatedUser)
      mutate(updatedUser, false)
    },
    [data, mutate]
  )

  const handleRemoveFavorites = useCallback(
    (professionalId: string, userId: string) => {
      axios.put(`/api/deleteFavorite`, { userId, professionalId })

      const updatedUser = {
        ...data,
        favorites: [{}]
      }

      mutate(updatedUser, true)
      mutateGlobal(`/api/user/${session?.user.email}`, data)
    },

    [data, mutate]
  )

  const joinDate = format(
    parseISO(professional.createdAt.toString()),
    'dd/MM/yyyy',
    {
      locale: ptBR
    }
  )

  const dateDistance = formatDistance(
    parseISO(new Date().toISOString()),
    parseISO(professional.createdAt.toString()),
    {
      locale: ptBR
    }
  )

  const formatedPhone = professional.phone
    .replace(/\(/g, '')
    .replace(/\)/g, '')
    .replace(/-/g, '')
    .replace(/ /g, '')

  return (
    <Container>
      {session ? (
        <>
          <Head>
            <title>Mãos à Obra | {professional.name}</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
            />
          </Head>

          <div className="user-content">
            <div className="user-info">
              <Image
                width={350}
                height={350}
                alt="User Avatar"
                src={professional.image}
              />

              <div className="user-info-data">
                <h1>{professional.name}</h1>

                <div className="specialties">
                  {professional.especialidades &&
                    professional.especialidades.map(item => (
                      <span key={item}>{item}</span>
                    ))}
                </div>
              </div>
            </div>

            <div className="user-location">
              <span>
                <RiMapPinLine size={25} />
                {professional.address.neighborhood}, {professional.address.city}{' '}
                - {professional.address.state}
              </span>

              {data && data._id === professional._id ? (
                <div className="edit-profile">
                  <Link href="/profile">
                    <a>
                      <BiEditAlt size={25} />
                      Editar Perfil
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="favorites">
                  {data?.favorites ? (
                    data.favorites.some(
                      (item: any) => item.professionalId === professional._id
                    ) ? (
                      <button
                        className="remove"
                        onClick={() =>
                          handleRemoveFavorites(professional._id, data._id)
                        }
                      >
                        <IoHeartDislike size={23} />
                        Remover dos favoritos
                      </button>
                    ) : (
                      <button
                        className="add"
                        onClick={() =>
                          handleFavorites(
                            professional._id,
                            professional.name,
                            professional.image,
                            data._id
                          )
                        }
                      >
                        <IoHeart size={23} />
                        Adicionar aos favoritos
                      </button>
                    )
                  ) : (
                    <button
                      className="add"
                      onClick={() =>
                        handleFavorites(
                          professional._id,
                          professional.name,
                          professional.image,
                          data._id
                        )
                      }
                    >
                      <IoHeart size={23} />
                      Adicionar aos favoritos
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="card-container">
            <div className="about-container">
              <div className="card">
                <h2>Sobre</h2>
                <p>{professional.description}</p>
              </div>

              <div className="card">
                <h2>Experiência</h2>
                <p>
                  {professional.experience > 1
                    ? `${professional.experience} anos`
                    : `${professional.experience} ano`}
                </p>
              </div>
            </div>

            <div className="card-infos">
              <h2>Informações Adicionais</h2>

              <div className="card-item-container">
                <div className="card-item">
                  <span>
                    <HiOutlineMail size={25} />
                    EMAIL
                  </span>

                  <a href={`mailto:${professional.email}`} target="_blank">
                    {professional.email}
                  </a>
                </div>

                <div className="card-item">
                  <div className="phone-info">
                    <span>
                      <RiPhoneFill size={25} />
                      TELEFONE
                    </span>

                    <a href={`tel:${professional.phone}`}>
                      {professional.phone}
                    </a>
                  </div>

                  <div className="whatsapp-button">
                    <a
                      href={`https://wa.me/+55${formatedPhone}?text=Olá ${professional.name}! Encontrei seu perfil no site Mãos à Obra e gostaria de ter mais informações sobre seus serviços.`}
                      target="_blank"
                    >
                      <RiWhatsappFill size={30} />
                    </a>
                  </div>
                </div>

                <div className="card-item">
                  <span>
                    <BiCalendar size={25} />
                    JUNTOU-SE
                  </span>

                  <p>
                    Há {dateDistance}, em {joinDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <NotLoggedPage />
      )}
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const { id } = ctx.params

  const { db } = await connect()

  const data = await db
    .collection('users')
    .findOne({ _id: new ObjectId(id + '') })

  const user = JSON.stringify(data)

  return {
    props: { user },
    revalidate: 60 * 60 * 8
  }
}
