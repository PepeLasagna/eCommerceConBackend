const express = require('express')
const appRoutes = express.Router()

const categoriesController = require('../controllers/categoriesController')
const userController = require('../controllers/userController')
const productsController = require('../controllers/productsController')
const cartController = require('../controllers/cartController')
const commentController = require('../controllers/commentController')

const { verifyToken } = require('../token')

appRoutes.get('/users', userController.getUserByToken)
appRoutes.post('/users', userController.getUser)
appRoutes.post('/users', userController.createUser)
appRoutes.put('/users/:id', userController.modifyUser)
appRoutes.delete('/users/:id', userController.deleteUser)

appRoutes.use(verifyToken)

appRoutes.get('/categories', categoriesController.getCategories)
appRoutes.post('/categories', categoriesController.createCategory)
appRoutes.put('/categories/:id', categoriesController.modifyCategory)
appRoutes.delete('/categories/:id', categoriesController.deleteCategory)

appRoutes.get('/products/:id', productsController.getProdById)
appRoutes.get('/product-info/:id', productsController.getSelectedProd)
appRoutes.post('/products', productsController.addProd)
appRoutes.delete('/products/:id', productsController.removeProduct)

appRoutes.get('/cart/:id', cartController.getCartByID)
appRoutes.post('/cart', cartController.addItem)
appRoutes.delete('/cart/:id', cartController.removeItem)
appRoutes.patch('/cart/:id', cartController.completeBuy)

appRoutes.get('/comments/:id', commentController.getComments)
appRoutes.post('/comments', commentController.postComment)
appRoutes.put('/comments/:id', commentController.modifyComment)
appRoutes.delete('/comments/:id', commentController.deleteComment)

module.exports = appRoutes
