import { products } from "../db-memory/products.js";
import { z } from 'zod'

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
  preço: z
    .number({
      invalid_type_error: "O preço deve ser numérico.",
      required_error: "Preço obrigatório"
    }),
  marca: z
    .string({
      invalid_type_error: "A marca deve ser uma string.",
      required_error: "Marca obrigatório"
    }),
  categoria: z
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
    preço: true,
    marca: true,
    categoria: true
  })
  return partialUserSchema.safeParse({ id })
}

const list = () => {
  return products
}

const getProduct = (id) => {
  return products.find((product) => product.id === id)
}

const create = (product) => {
  product.id = products[products.length - 1].id + 1;
  products.push(product)
  return products
}

const edit = (product) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == product.id) {
      products[i].name = product.name || products[i].name
      products[i].preço = product.preço || products[i].preço
      products[i].marca = product.marca || products[i].marca
      products[i].categoria = product.categoria || products[i].categoria
    }
  }
  return products
}

const remove = (product) => {
  return products.filter(products => products.id != product.id)
}

export default { list, create, edit, remove, validadeCreate, validadeEdit, validadeId, getProduct }