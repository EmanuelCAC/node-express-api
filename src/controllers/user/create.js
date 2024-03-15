import userModel from "../../models/userModel.js"

const create = async (req, res) => {
  const user = req.body
  const validadeData = userModel.validadeCreate(user)
  if (!validadeData.success) {
    return res.status(400).json({
      error: "Dados invalidos!",
      fields: validadeData.error.flatten().fieldErrors
    })
  }
  const result = await userModel.create(user)
  res.json({
    success: "Usúario listado com sucesso!",
    user: result
  })
}

export default create