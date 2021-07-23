import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../utils/database'

interface ErrorResponseType {
  error: string
}

interface SuccessResponseType {
  message: string
}

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

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
) => {
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
          professional: false,
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
