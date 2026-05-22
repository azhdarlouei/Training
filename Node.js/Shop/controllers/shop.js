const Product = require('../models/product')

exports.getIndex = (req, res) => {
    Product.find()
        .then(products => {
            res.render('shop/index', {
                pageTitle: 'Shop',
                path: '/',
                products: products
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getProduct = (req, res) => {
    const id = req.params.productId

    Product.findById(id)
        .then(product => {
            console.log(product)
            res.render('shop/product-detail', {
                pageTitle: 'Product Detail',
                path: '/product-detail',
                product: product
            })
        })

}