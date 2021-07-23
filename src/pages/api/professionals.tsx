import { NextApiRequest, NextApiResponse } from 'next'
import capitalizeString from '../../utils/capitalizeString'
import { connect } from '../../utils/database'

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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const page = Number(req.query.page) || 1
    const especialidade: string | string[] = req.query.especialidade
    const city: string | string[] = req.query.city

    const perPage = 9

    try {
      const { db } = await connect()
      const users = await db
        .collection('users')
        .find({
          professional: true,
          city: capitalizeString(city),
          especialidades: capitalizeString(especialidade)
        })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .toArray()

      const totalUsers = await db
        .collection('users')
        .find({
          professional: true,
          city,
          especialidades: especialidade
        })
        .count()

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
