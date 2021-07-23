import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../utils/database'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const page = Number(req.query.page) || 1
    const perPage = 9

    try {
      const { db } = await connect()
      const users = await db
        .collection('users')
        .find({ professional: true })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .toArray()

      const totalUsers = await db
        .collection('users')
        .find({ professional: true })
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
  } else {
    return res.status(400).json({ error: 'Wrong request method' })
  }
}
