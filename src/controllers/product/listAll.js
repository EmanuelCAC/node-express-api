import productModel from "../../models/productModel.js"

const listAll = async (req, res) => {
  res.json({
    success: "Produtos listados com sucesso!",
    products: await productModel.list()
  })
}

export default listAll