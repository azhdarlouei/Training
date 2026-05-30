const express = require('express')

const shopController = require('../controllers/shop')

const router = express.Router()

router.get('/', shopController.getIndex)
router.get('/products/:productId', shopController.getProduct)
router.get('/products',shopController.getAllProduct)
router.post('/cart', shopController.postCart)
router.get('/cart', shopController.getCart)
router.post('/cart-delete-items', shopController.postCartDeleteProduct)

module.exports = router