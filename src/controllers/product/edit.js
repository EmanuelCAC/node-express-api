import productModel from "../../models/productModel.js"

const edit = async (req, res) => {
  const product = { ...req.body, id: +req.params.id }
  const validadeData = productModel.validadeEdit(product)
  if (!validadeData.success) {
    return res.status(400).json({
      error: "Dados invalidos!",
      fields: validadeData.error.flatten().fieldErrors
    })
  }
  const result = await productModel.edit(product)

  res.json({
    success: "Usúarios listados com sucesso!",
    product: result
  })
}

export default edit