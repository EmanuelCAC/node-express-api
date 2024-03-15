import productModel from "../../models/productModel.js"

const create = async (req, res) => {
  const product = req.body
  const validadeData = productModel.validadeCreate(product)
  if (!validadeData.success) {
    return res.status(400).json({
      error: "Dados invalidos!",
      fields: validadeData.error.flatten().fieldErrors
    })
  }
  const result = await productModel.create(product)

  res.json({
    success: "Usúario listados com sucesso!",
    product: result
  })
}

export default create