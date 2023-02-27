const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartShema = new Schema({
    buyerEmail: {
        type: String,
        required: true

    },
    itemID : {
        type : String,
        required: true
        
    },
    ProductQty : {
        type : String,
        required: true

    }

})

const ShoppingCart = mongoose.model("ShoppingCart",cartShema);
module.exports = ShoppingCart;

