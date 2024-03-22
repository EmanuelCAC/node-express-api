import express from "express"
import { PORT, HOST } from "./config.js"
import logger from "./middlewares/logger.js"
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productsRouter.js'
import authRouter from './routers/authRouter.js'

const app = express()

app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the API" })
})

app.use('/auth', authRouter)

app.use('/user', userRouter)

app.use('/product', productRouter)

app.listen(PORT, () => {
  console.log(`Servidor rodando em ${HOST}:${PORT}`)
})