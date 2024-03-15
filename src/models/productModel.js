import { products } from "../db-memory/products.js";
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userSchema = z.object({
  id: z
    .number({
      invalid_type_error: "O id deve ser numérico.",
      required_error: "Id obrigatório"
    }),
  name: z
    .string({
      invalid_type_error: "O nome deve ser uma string.",
      required_error: "Nome obrigatório"
    })
    .min(3, { message: "O nome do usuário deve ter ao menos 3 letras." })
    .max(200, { message: "O nome do usuário deve ter ao menos 200 caracteres." }),
  value: z
    .number({
      invalid_type_error: "O preço deve ser numérico.",
      required_error: "Preço obrigatório"
    }),
  brand: z
    .string({
      invalid_type_error: "A marca deve ser uma string.",
      required_error: "Marca obrigatório"
    }),
  category: z
    .string({
      invalid_type_error: "A categoria deve ser uma string.",
      required_error: "Categoria obrigatório"
    }),
})

const validadeCreate = (product) => {
  const partialUserSchema = userSchema.partial({ id: true })
  return partialUserSchema.safeParse(product)
}

const validadeEdit = (product) => {
  return userSchema.safeParse(product)
}

const validadeId = (id) => {
  const partialUserSchema = userSchema.partial({
    name: true,
    value: true,
    brand: true,
    category: true
  })
  return partialUserSchema.safeParse({ id })
}

const list = async () => {
  return await prisma.product.findMany()
}

const getProduct = async (id) => {
  return await prisma.product.findUnique({
    where: {
      id
    }
  })
}

const create = async (product) => {
  return await prisma.product.create({
    data: product
  })
}

const edit = async (product) => {
  return await prisma.product.update({
    where: {
      id: product.id
    },
    data: product
  })
}

const remove = async (product) => {
  return await prisma.product.delete({
    where: {
      id: product.id
    }
  })
}

export default { list, create, edit, remove, validadeCreate, validadeEdit, validadeId, getProduct }