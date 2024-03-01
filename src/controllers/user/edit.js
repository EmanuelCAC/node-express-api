import userModel from "../../models/userModel.js"

const edit = (req, res) => {
  const user = req.body
  const result = userModel.edit(user)

  res.json({
    success: "Usúarios listados com sucesso!",
    users: result
  })
}

export default edit