import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const logout = async (req, res) => {
  let token = false

  token = req?.cookies?.refreshToken

  const authorization = req.headers?.authorization
  if(authorization) token = authorization.split(' ')[1]

  if (!token) return res.status(401).json({
    error: "Usuário não autenticado",
    code: "token-not-found"
  })

  res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true})

  const sessionFound = await prisma.session.delete({
    where: {
      token: token,
    }
  })

  if (!sessionFound) return res.status(401).json({
    error: "Sessão não encontrada",
    code: "session-not-found"
  })

  return res.json({success: true})
}

export default logout