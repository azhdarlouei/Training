const Product = require('../models/product')

exports.getProducts = (req, res) => {
    Product.find()
        .then(
            products => {
                res.render('admin/products', {
                    products: products,
                    pageTitle: 'Admin Products',
                    path: '/admin/products'
                })
            })
}

exports.getAddProduct = (req, res) => {
    res.render('admin/add-product', {
        path: '/admin/add-product',
        pageTitle: 'Add Product',
        editing: false
    })
}

exports.postAddProduct = (req, res) => {
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
                product: product
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