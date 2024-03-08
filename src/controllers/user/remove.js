import userModel from "../../models/userModel.js"

const remove = (req, res) => {
  const { id } = req.params

  const validadeData = userModel.validadeId(+id)
  console.log(validadeData);
  if (!validadeData.success) {
    return res.status(400).json({
      error: "Dados invalidos!",
      fields: validadeData.error.flatten().fieldErrors
    })
  }
  const result = userModel.remove(validadeData.data)

  res.json({
    success: "Usúarios listados com sucesso!",
    result
  })
}

export default remove