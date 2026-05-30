const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 15
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 8,
        maxLength: 30
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
})

userSchema.methods.addToCart = function (product) {
    const cartItems = this.cart && this.cart.items ? [...this.cart.items] : [];

    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString()
    })

    let newQuantity = 1
    const UpdatedCartItems = [...this.cart.items]

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1
        UpdatedCartItems[cartProductIndex].quantity = newQuantity
    } else {
        UpdatedCartItems.push({
            productId: product._id,
            quantity: newQuantity 
        })
    }

    const updatedCart = {
        items: UpdatedCartItems
    }
    this.cart = updatedCart
    return this.save()
}

module.exports = mongoose.model('User', userSchema)