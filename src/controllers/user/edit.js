import userModel from "../../models/userModel.js"

const edit = async (req, res) => {
  const user = { ...req.body, id: +req.params.id }
  const validadeData = userModel.validadeEdit(user)
  if (!validadeData.success) {
    return res.status(400).json({
      error: "Dados invalidos!",
      fields: validadeData.error.flatten().fieldErrors
    })
  }
  const result = await userModel.edit(user)
  res.json({
    success: "Usúarios listados com sucesso!",
    user: result
  })
}

export default edit