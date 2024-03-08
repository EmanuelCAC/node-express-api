import productModel from "../../models/productModel.js"

const edit = (req, res) => {
  const product = { ...req.body, id: +req.params.id }
  const validadeData = productModel.validadeEdit(product)
  if (!validadeData.success) {
    return res.status(400).json({
      error: "Dados invalidos!",
      fields: validadeData.error.flatten().fieldErrors
    })
  }
  const result = productModel.edit(product)

  res.json({
    success: "Usúarios listados com sucesso!",
    products: result
  })
}

export default edit