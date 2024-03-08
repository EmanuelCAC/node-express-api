import productModel from "../../models/productModel.js"

const create = (req, res) => {
  const product = req.body
  const validadeData = productModel.validadeCreate(product)
  if (!validadeData.success) {
    return res.status(400).json({
      error: "Dados invalidos!",
      fields: validadeData.error.flatten().fieldErrors
    })
  }
  const result = productModel.create(product)

  res.json({
    success: "Usúario listados com sucesso!",
    products: result
  })
}

export default create