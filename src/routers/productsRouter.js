import express from "express"
import listAll from "../controllers/product/listAll.js";
import create from "../controllers/product/create.js";
import edit from "../controllers/product/edit.js";
import remove from "../controllers/product/remove.js";
import getProduct from "../controllers/product/getProduct.js";

const router = express.Router()

router.get('/', listAll)
router.get('/:id', getProduct)
router.post('/', create)
router.put('/:id', edit)
router.delete('/:id', remove)

export default router