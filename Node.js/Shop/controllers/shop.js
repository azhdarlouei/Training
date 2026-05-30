const Product = require('../models/product')

exports.getAllProduct = (req, res) => {
    Product.find()
        .then(products => {
            res.render('shop/all-products', {
                path: '/products',
                pageTitle: 'Products',
                products: products
            })
        })
}

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
            res.render('shop/product-detail', {
                pageTitle: 'Product Detail',
                path: '/product-detail',
                product: product
            })
        })

}

exports.postCart = (req, res) => {
    const id = req.body.productId

    Product.findById(id)
        .then(product => {
            req.user.addToCart(product)
            res.redirect('/')
        })
}

exports.getCart = async (req, res) => {
    const user = await req.user.populate('cart.items.productId')

    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products: user.cart.items
    })
}

exports.postCartDeleteProduct = (req, res) => {
    const id = req.body.productId

    req.user.removeFromCart(id)
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => {
            console.log(err)
        })
}