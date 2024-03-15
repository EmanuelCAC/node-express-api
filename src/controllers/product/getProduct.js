import productModel from "../../models/productModel.js"

const getProduct = async (req, res) => {
  const { id } = req.params
  const result = await productModel.getProduct(+id)
  res.json({
    success: "Usúarios listados com sucesso!",
    user: result
  })
}

export default getProduct