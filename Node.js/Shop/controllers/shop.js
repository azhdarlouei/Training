const Product = require('../models/product')
const Order = require('../models/order')
const parsCookies = require('../util/cookieparseer')


exports.getAllProduct = (req, res) => {
    const isLoggedIn = parsCookies(req)

    Product.find()
        .then(products => {
            res.render('shop/all-products', {
                path: '/products',
                pageTitle: 'Products',
                products: products,
                isAuthenticated: isLoggedIn['loggedIn']
            })
        })
}

exports.getIndex = (req, res) => {
    const isLoggedIn = parsCookies(req)

    Product.find()
        .then(products => {
            res.render('shop/index', {
                pageTitle: 'Shop',
                path: '/',
                products: products,
                isAuthenticated: isLoggedIn['loggedIn']
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getProduct = (req, res) => {
    const isLoggedIn = parsCookies(req)

    const id = req.params.productId

    Product.findById(id)
        .then(product => {
            res.render('shop/product-detail', {
                pageTitle: 'Product Detail',
                path: '/product-detail',
                product: product,
                isAuthenticated: isLoggedIn['loggedIn']

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
    const isLoggedIn = parsCookies(req)

    const user = await req.user.populate('cart.items.productId')

    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products: user.cart.items,
        isAuthenticated: isLoggedIn['loggedIn']

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

exports.postOrder = (req, res) => {
    req.user.populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, products: { ...i.productId._doc } }
            })

            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            })

            return order.save()
        })
        .then(() => {
            return req.user.clearCart()
        })
        .then(() => {
            res.redirect('/orders')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getOrders = (req, res) => {
    const isLoggedIn = parsCookies(req)

    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: 'Orders',
                path: '/orders',
                orders: orders,
                isAuthenticated: isLoggedIn['loggedIn']
            })
        })
        .catch(err => {
            console.log(err)
        })
}