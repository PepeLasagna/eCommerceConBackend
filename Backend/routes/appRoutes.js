const express = require('express');

const appRoutes = express.Router();

const categoriesController = require('../controller/categoriesController');

const catProdController = require('../controller/catProdController');

const userController = require('../controller/userController');

const productsController = require('../controller/productsController');

const relatedController = require('../controller/relatedController')



appRoutes.get("/categories", categoriesController.getCategories);

appRoutes.get("/cat_products", catProdController.getCatProds);

appRoutes.get("/products", productsController.getProducts);

appRoutes.get("/products/:id", productsController.getProductByID);

appRoutes.get("/related_products/:id", relatedController.getRelatedByID)



module.exports = appRoutes;