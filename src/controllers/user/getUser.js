import userModel from "../../models/userModel.js"

const getUser = (req, res) => {
  const { id } = req.params
  const result = userModel.getUser(+id)
  res.json({
    success: "Usúarios listados com sucesso!",
    users: result
  })
}

export default getUser