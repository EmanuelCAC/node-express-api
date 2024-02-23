import express from "express"
import { users } from "../db-memory/user.js";

const router = express.Router()

router.get('/', (req, res) => {
	res.json({
		success: "Usúarios listados com sucesso!",
		users
	})
})

router.post('/', (req, res) => {
	const user = req.body
	user.id = users[users.length - 1].id + 1;
	users.push(user)

	res.json({
		success: "Usúario listados com sucesso!",
		users
	})
})

router.put('/', (req, res) => {
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

router.delete('/', (req, res) => {
	const user = req.body
	const newUser = users.filter(users => users.id != user.id)

	res.json({
		success: "Usúarios listados com sucesso!",
		newUser
	})
})

export default router