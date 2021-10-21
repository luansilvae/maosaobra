import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../utils/database'

interface User {
  professionalId: string
  professionalName: string
  professionalImage: string
  userId: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    const {
      professionalId,
      professionalName,
      professionalImage,
      userId
    }: User = req.body

    const favoriteData = {
      professionalId: new ObjectId(professionalId + ''),
      professionalName,
      professionalImage
    }

    const { db } = await connect()

    await db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(userId + '') },
      {
        $push: {
          favorites: favoriteData
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
