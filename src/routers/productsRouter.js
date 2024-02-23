import express from "express"
import { products } from "../db-memory/products.js";

const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        success: "Produtos listados com sucesso!",
        products
    })
})

router.post('/', (req, res) => {
    const product = req.body
    product.id = products[products.length - 1].id + 1;
    products.push(product)

    res.json({
        success: "Usúario listados com sucesso!",
        products
    })
})

router.put('/', (req, res) => {
    const product = req.body
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == product.id) {
            products[i].name = product.name || products[i].name
            products[i].preço = product.preço || products[i].preço
            products[i].marca = product.marca || products[i].marca
            products[i].categoria = product.categoria || products[i].categoria
        }
    }

    res.json({
        success: "Usúarios listados com sucesso!",
        products
    })
})

router.delete('/', (req, res) => {
    const product = req.body
    const newProduct = products.filter(products => products.id != product.id)

    res.json({
        success: "Usúarios listados com sucesso!",
        newProduct
    })
})

export default router