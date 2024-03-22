import userModel from "../../models/userModel.js"
import { hash } from 'bcrypt'

const create = async (req, res) => {
  const user = req.body
  const validadeData = userModel.validadeCreate(user)
  if (!validadeData.success) {
    return res.status(400).json({
      error: "Dados invalidos!",
      fields: validadeData.error.flatten().fieldErrors
    })
  }
  user.pass = await hash(validadeData.data.pass, 10)
  const result = await userModel.create(user)
  delete result.pass
  res.json({
    success: "Usúario listado com sucesso!",
    user: result
  })
}

export default create