import { users } from "../db-memory/user.js"
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
    .url({ message: "Url do avata invalido." }),
  pass: z
    .string({
      invalid_type_error: "A senha deve ser uma string.",
      required_error: "Senha obrigatório"
    })
    .min(6, { message: "A senha do usuário deve ter ao menos 6 caracteres" })
})

const validadeCreate = (user) => {
  const partialUserSchema = userSchema.partial({ id: true })
  return partialUserSchema.safeParse(user)
}

const validadeEdit = (user) => {
  const partialUserSchema = userSchema.partial({ pass: true })
  return partialUserSchema.safeParse(user)
}

const validadeId = (id) => {
  const partialUserSchema = userSchema.partial({
    name: true,
    email: true,
    avatar: true,
    pass: true
  })
  return partialUserSchema.safeParse({ id })
}

const list = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true
    }
  })
}

const getUser = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true
    }
  })
}

const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email
    },
  })
}

const create = async (user) => {
  return await prisma.user.create({
    data: user
  })
}

const edit = async (user) => {
  return await prisma.user.update({
    where: {
      id: user.id
    },
    data: user,
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true
    }
  })
}

const remove = async (user) => {
  return await prisma.user.delete({
    where: {
      id: user.id
    }
  })
}

export default { list, getUser, create, edit, remove, validadeCreate, validadeEdit, validadeId, getUserByEmail }