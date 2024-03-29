import userModel from "../../models/userModel.js"
import { compare } from "bcrypt"
import jwt from 'jsonwebtoken'


const login = async (req, res) => {
  const { email, pass } = req.body

  const userFound = await userModel.getUserByEmail(email)
  if (!userFound) {
    return res.status(401).json({
      error: "Email ou senha invalida!",
    })
  }

  const isValid = await compare(pass, userFound.pass)
  if (!isValid) return res.status(401).json({
    error: "Email ou senha inválida!"
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

  delete userFound.pass
  return res.json({
    success: `Usuário do login!`,
    user: userFound,
    accessToken,
    refreshToken
  })
}

export default login