import express from "express"
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json({message: "Hello World!"})
})

app.get('/produto', (req, res) => {
    res.json({message: "Rota de produto"})
  })

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`)
})