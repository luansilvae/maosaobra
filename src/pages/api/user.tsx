import { NextApiRequest, NextApiResponse } from 'next'
import capitalizeString from '../../utils/capitalizeString'
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
  phone: string
  cnpj: string
  description: string
  especialidades: string[]
  experience: number
  professional: boolean
  address: {
    cep: string
    state: string
    neighborhood: string
    city: string
  }
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
) => {
  if (req.method === 'PUT') {
    const { name, email, phone, address }: User = req.body

    const { db } = await connect()

    await db
      .collection('users')
      .updateOne(
        { email: email },
        { $set: { name: capitalizeString(name), phone, address } }
      )

    return res.status(200).json({ message: 'Usuário alterado com sucesso.' })
  } else {
    return res.status(400).json({ error: 'Wrong request method' })
  }
}
