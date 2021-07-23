import { ObjectId } from 'bson'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { RiMapPinLine } from 'react-icons/ri'
import { connect } from '../../utils/database'

import Container from './styles'

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

export default function Professional({ user }) {
  const professional: User = JSON.parse(user)

  const formatedPhone = professional.phone
    .replace(/\(/g, '')
    .replace(/\)/g, '')
    .replace(/-/g, '')
    .replace(/ /g, '')

  return (
    <Container>
      <Head>
        <title>Mãos à Obra | {professional.name}</title>
      </Head>

      <div className="user-content">
        <Image
          width={350}
          height={350}
          alt="User Avatar"
          src={professional.image}
        />

        <div className="user-info">
          <div className="user-info-data">
            <h1>{professional.name}</h1>
            <span>
              <RiMapPinLine size={25} />
              {professional.neighborhood}, {professional.city} -{' '}
              {professional.state}
            </span>
          </div>

          <div className="description">
            {professional.especialidades &&
              professional.especialidades.map(item => (
                <span key={item}>{item}</span>
              ))}
          </div>

          <p>
            <span>CNPJ:</span> {professional.cnpj}
          </p>
        </div>
      </div>

      <div className="card">
        <h2>Descrição</h2>
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

      <div className="card">
        <h2>Contato</h2>
        <p>
          <span>E-mail: </span> {professional.email}
        </p>

        <p>
          <span>Telefone: </span> {professional.phone}
        </p>

        <a
          href={`https://wa.me/+55${formatedPhone}?text=Olá ${professional.name}! Encontrei seu perfil no site Mãos à Obra e gostaria de ter mais informações sobre seus serviços.`}
          target="_blank"
        >
          <button>
            <FaWhatsapp size={28} /> Chamar no WhatsApp
          </button>
        </a>
      </div>
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
