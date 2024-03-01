import productModel from "../../models/productModel.js";

const remove = (req, res) => {
  const product = req.body
  const newProduct = productModel.remove(product)

  res.json({
    success: "Usúarios listados com sucesso!",
    newProduct
  })
}

export default remove