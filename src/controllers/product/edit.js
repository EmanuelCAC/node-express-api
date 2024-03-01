import productModel from "../../models/productModel"

const edit = (req, res) => {
  const product = req.body
  const result = productModel.create(product)

  res.json({
    success: "Usúarios listados com sucesso!",
    products: result
  })
}

export default edit