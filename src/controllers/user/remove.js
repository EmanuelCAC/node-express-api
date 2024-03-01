import userModel from "../../models/userModel.js"

const remove = (req, res) => {
  const user = req.body
  const newUser = userModel.remove(user)

  res.json({
    success: "Usúarios listados com sucesso!",
    newUser
  })
}

export default remove