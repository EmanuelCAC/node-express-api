import { products } from "../db-memory/products.js";

const list = () => {
  return products
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

const remove = (produc) => {
  return products.filter(products => products.id != produc.id)
}

export default { list, create, edit, remove }