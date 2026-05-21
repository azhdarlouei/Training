const Product = require('../models/product')

exports.getAddProduct = (req, res) => {
    res.render('admin/add-product')
}

exports.postAddProduct = (req, res)=>{
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl
    })
    product.save()
        .then(result=>{
            console.log('Created Product')
            res.redirect('/')
        })
}