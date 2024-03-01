import { users } from "../db-memory/user.js"
import { z } from 'zod'

const userSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(200),
  email: z.string().email(),
  avatar: z.string().url()
})

const validadeCreate = (user) => {
  const partialUserSchema = userSchema.partial({ id: true })
  return partialUserSchema.safeParse(user)
}

const list = () => {
  return users
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

export default { list, create, edit, remove, validadeCreate }