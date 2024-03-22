import userModel from "../../models/userModel.js"
import { compare } from "bcrypt"


const login = async (req, res) => {
  const { email, pass } = req.body

  const userFound = userModel.getUserByEmail(email)

  if (!userFound) {
    return res.status(401).json({
      error: "Email ou senha invalida!",
    })
  }

  const decoded = await compare(pass, userFound.pass)

  return res.json({
    success: `Usuário do login!`,
    user: userFound
  })
}

export default login