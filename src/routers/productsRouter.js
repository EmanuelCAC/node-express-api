import express from "express"
import listAll from "../controllers/product/listAll.js";
import create from "../controllers/product/create.js";
import edit from "../controllers/product/edit.js";
import remove from "../controllers/product/remove.js";

const router = express.Router()

router.get('/', listAll)

router.post('/', create)

router.put('/', edit)

router.delete('/', remove)

export default router