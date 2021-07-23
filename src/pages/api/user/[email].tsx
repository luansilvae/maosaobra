import { connect } from '../../../utils/database'

import { getSession } from 'next-auth/client'
import { NextApiRequest, NextApiResponse } from 'next'

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
  const session = await getSession({ req })

  if (session) {
    const { email } = req.query

    const { db } = await connect()

    const response: User = await db.collection('users').findOne({ email })

    return res.send(response)
  } else {
    res.send({
      error: 'You must be sign in to view the protected content on this page.'
    })
  }
}
