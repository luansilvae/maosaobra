import { NextApiRequest, NextApiResponse } from 'next'
import capitalizeString from '../../utils/capitalizeString'
import { connect } from '../../utils/database'

interface User {
  _id: string
  name: string
  email: string
  image: string
  phone: string
  address: {
    city: string
    neighborhood: string
    state: string
  }
  professional: boolean
  cnpj: string
  description: string
  especialidades: string[]
  experience: number
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const page = Number(req.query.page) || 1
    const especialidade: string | string[] = req.query.especialidade
    const city: string | string[] = req.query.city

    const perPage = 9

    let users: any[]
    let totalUsers: number

    try {
      const { db } = await connect()

      if (city !== 'undefined') {
        users = await db
          .collection('users')
          .find({
            professional: true,
            especialidades: capitalizeString(especialidade),
            'address.city': capitalizeString(city)
          })
          .skip((page - 1) * perPage)
          .limit(perPage)
          .toArray()

        totalUsers = await db
          .collection('users')
          .find({
            professional: true,
            especialidades: especialidade,
            'address.city': capitalizeString(city)
          })
          .count()
      } else {
        users = await db
          .collection('users')
          .find({
            professional: true,
            especialidades: capitalizeString(especialidade)
          })
          .skip((page - 1) * perPage)
          .limit(perPage)
          .toArray()

        totalUsers = await db
          .collection('users')
          .find({
            professional: true,
            especialidades: especialidade
          })
          .count()
      }

      return res.status(200).json({
        users,
        page,
        maxPage: Math.ceil(totalUsers / perPage),
        total: totalUsers
      })
    } catch (error) {
      return res.status(400).json({ error: 'error ao listar' })
    }
  }

  if (req.method === 'PUT') {
    const { description, experience, cnpj, email, especialidades }: User =
      req.body
    const { db } = await connect()

    await db.collection('users').updateOne(
      { email: email },
      {
        $set: {
          description,
          experience,
          cnpj,
          professional: true,
          especialidades
        }
      }
    )

    return res
      .status(200)
      .json({ message: 'Profissional alterado com sucesso' })
  } else {
    return res.status(400).json({ error: 'Wrong request method' })
  }
}
