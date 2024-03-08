import productModel from "../../models/productModel.js"

const getProduct = (req, res) => {
  const { id } = req.params
  const result = productModel.getProduct(+id)
  res.json({
    success: "Usúarios listados com sucesso!",
    users: result
  })
}

export default getProduct