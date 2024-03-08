import userModel from "../../models/userModel.js"

const edit = (req, res) => {
  const user = { ...req.body, id: +req.params.id }
  const validadeData = userModel.validadeEdit(user)
  if (!validadeData.success) {
    return res.status(400).json({
      error: "Dados invalidos!",
      fields: validadeData.error.flatten().fieldErrors
    })
  }
  const result = userModel.edit(user)
  res.json({
    success: "Usúarios listados com sucesso!",
    users: result
  })
}

export default edit