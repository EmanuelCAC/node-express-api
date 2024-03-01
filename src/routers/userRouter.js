import express from "express"
import listAll from "../controllers/user/listAll.js"
import create from "../controllers/user/create.js";
import edit from "../controllers/user/edit.js";
import remove from "../controllers/user/remove.js";

const router = express.Router()

router.get('/', listAll)

router.post('/', create)

router.put('/', edit)

router.delete('/', remove)

export default router