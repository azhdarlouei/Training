const Product = require('../models/product')
const parsCookies = require('../util/cookieparseer')

exports.getProducts = (req, res) => {
    const isLoggedIn = parsCookies(req)

    Product.find()
        .then(
            products => {
                res.render('admin/products', {
                    products: products,
                    pageTitle: 'Admin Products',
                    path: '/admin/products',
                    isAuthenticated: isLoggedIn['loggedIn']
                })
            })
}

exports.getAddProduct = (req, res) => {
    const isLoggedIn = parsCookies(req)

    res.render('admin/add-product', {
        path: '/admin/add-product',
        pageTitle: 'Add Product',
        editing: false,
        isAuthenticated: isLoggedIn['loggedIn']
    })
}

exports.postAddProduct = (req, res) => {
    const isLoggedIn = parsCookies(req)

    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
    })
    product.save()
        .then(result => {
            console.log('Created Product')
            res.redirect('/')
        })
}

exports.getEditProduct = (req, res) => {
    const isLoggedIn = parsCookies(req)

    const editMode = req.query.edit

    if (!editMode)
        return res.redirect('/')

    const id = req.params.productId

    Product.findById(id)
        .then(product => {
            if (!product)
                return res.redirect('/')

            res.render('admin/add-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product,
                isAuthenticated: isLoggedIn['loggedIn']

            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postEditProduct = (req, res) => {
    const id = req.body.id

    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    Product.findById(id)
        .then(product => {
            product.title = title
            product.price = price
            product.description = description
            product.imageUrl = imageUrl
            return product.save()
        })
        .then(result => {
            console.log('product updated')
            res.redirect('/')
        })
}

exports.getDeletePost = (req, res) => {
    const isLoggedIn = parsCookies(req)

    const id = req.params.productId
    Product.findByIdAndDelete(id)
        .then(result => {
            console.log('product deleted')
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
        })
}