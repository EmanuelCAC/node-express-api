import productModel from "../../models/productModel.js";

const remove = (req, res) => {
  const { id } = req.params
  const validadeData = productModel.validadeId(+id)
  if (!validadeData.success) {
    return res.status(400).json({
      error: "Dados invalidos!",
      fields: validadeData.error.flatten().fieldErrors
    })
  }
  const result = productModel.remove(validadeData.data)

  res.json({
    success: "Usúarios listados com sucesso!",
    result
  })
}

export default remove