const express = require('express')

const shopController = require('../controllers/shop')

const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/', shopController.getIndex)
router.get('/products/:productId', shopController.getProduct)
router.get('/products', shopController.getAllProduct)
router.post('/cart', isAuth, shopController.postCart)
router.get('/cart', isAuth, shopController.getCart)
router.post('/cart-delete-items', isAuth, shopController.postCartDeleteProduct)
router.post('/create-order', isAuth, shopController.postOrder)
router.get('/orders', isAuth, shopController.getOrders)

module.exports = router