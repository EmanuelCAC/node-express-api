import express from "express"
import { PORT, HOST } from "./config.js"
import { users } from "./db-memory/user.js"

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the API" })
})

app.get('/user', (req, res) => {
  res.json({
    success: "Usúarios listados com sucesso!",
    users
  })
})

app.post('/user', (req, res) => {
  const user = req.body
  user.id = users[users.length - 1].id + 1;
  users.push(user)

  res.json({
    success: "Usúarios listados com sucesso!",
    users
  })
})

app.put('/user', (req, res) => {
  const user = req.body
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == user.id) {
      users[i].name = user.name || users[i].name
      users[i].email = user.email || users[i].email
      users[i].avatar = user.avatar || users[i].avatar
    }
  }

  res.json({
    success: "Usúarios listados com sucesso!",
    users
  })
})

app.delete('/user', (req, res) => {
  const user = req.body
  const newUser = users.filter((users) => users.id != user.id)

  res.json({
    success: "Usúarios listados com sucesso!",
    newUser
  })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em ${HOST}:${PORT}`)
})