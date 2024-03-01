import userModel from "../../models/userModel.js"

const create = (req, res) => {
  const user = req.body
  const validadeData = userModel.validadeCreate(user)
  if (!validadeData.success) {
    return res.status(401).json({
      error: "Dados invalidos!",
    })
  }
  const result = userModel.create(user)
  res.json({
    success: "Usúario listados com sucesso!",
    users: result
  })
}

export default create