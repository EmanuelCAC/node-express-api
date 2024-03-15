import userModel from "../../models/userModel.js"

const getUser = async (req, res) => {
  const { id } = req.params
  const result = await userModel.getUser(+id)
  res.json({
    success: "Usúarios listados com sucesso!",
    user: result
  })
}

export default getUser