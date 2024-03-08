import express from "express"
import listAll from "../controllers/user/listAll.js"
import create from "../controllers/user/create.js";
import edit from "../controllers/user/edit.js";
import remove from "../controllers/user/remove.js";
import getUser from "../controllers/user/getUser.js"

const router = express.Router()

router.get('/', listAll)
router.get('/:id', getUser)
router.post('/', create)
router.put('/:id', edit)
router.delete('/:id', remove)

export default router