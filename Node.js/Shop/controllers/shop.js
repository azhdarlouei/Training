const Product = require('../models/product')

exports.getProducts = (req, res) => {
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