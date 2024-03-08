import { users } from "../db-memory/user.js"
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
  email: z
    .string({
      invalid_type_error: "O email deve ser uma string.",
      required_error: "Email obrigatório"
    })
    .email({ message: "Email invalido." }),
  avatar: z
    .string({
      invalid_type_error: "O avatar deve ser uma string.",
      required_error: "Avatar obrigatório"
    })
    .url({ message: "Url do avata invalido." })
})

const validadeCreate = (user) => {
  const partialUserSchema = userSchema.partial({ id: true })
  return partialUserSchema.safeParse(user)
}

const validadeEdit = (user) => {
  return userSchema.safeParse(user)
}

const validadeId = (id) => {
  const partialUserSchema = userSchema.partial({
    name: true,
    email: true,
    avatar: true
  })
  return partialUserSchema.safeParse({ id })
}

const list = () => {
  return users
}

const getUser = (id) => {
  return users.find((user) => user.id === id)
}

const create = (user) => {
  user.id = users[users.length - 1].id + 1;
  users.push(user)
  return users
}

const edit = (user) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == user.id) {
      users[i].name = user.name || users[i].name
      users[i].email = user.email || users[i].email
      users[i].avatar = user.avatar || users[i].avatar
    }
  }
  return users
}

const remove = (user) => {
  return users.filter(users => users.id != user.id)
}

export default { list, getUser, create, edit, remove, validadeCreate, validadeEdit, validadeId }