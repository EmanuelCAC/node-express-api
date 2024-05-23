import jwt from 'jsonwebtoken'
import userModel from '../../models/userModel.js'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const refreshToken = async (req, res) => {
  let token = false

  token = req?.cookies?.refreshToken

  const authorization = req.headers?.authorization
  if(authorization) token = authorization.split(' ')[1]

  if (!token) return res.status(401).json({
    error: "Usuário não autenticado",
    code: "token-not-found"
  })

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.status(401).json({
        msg: err.message
      })
    }
    const userFound = await userModel.getUser(decoded.id)
    const sessionFound = await prisma.session.findUnique({
      where: {
        token: token,
        user_id: userFound.id
      }
    })

    if (!sessionFound?.id) return res.status(401).json({
      error: "Usuário não autorizado",
      code: "session-not-found"
    })

    const accessToken = jwt.sign(
      {
        id: userFound.id,
        name: userFound.name,
        avatar: userFound.avatar
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1m'
      }
    )
    const refreshToken = jwt.sign(
      {
        id: userFound.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '3m'
      }
    )

    await prisma.session.update({
      where: {
        user_id: userFound.id,
        token: token
      },
      data: {
        token: refreshToken
      }
    })

    delete userFound.pass
    return res.json({
      success: `AccessToken e RefreshToken Revalidado!`,
      user: userFound,
      accessToken,
      refreshToken
    })
  })
}

export default refreshToken