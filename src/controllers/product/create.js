import productModel from "../../models/productModel.js"

const create = (req, res) => {
  const product = req.body
  const result = productModel.create(product)

  res.json({
    success: "Usúario listados com sucesso!",
    products: result
  })
}

export default create