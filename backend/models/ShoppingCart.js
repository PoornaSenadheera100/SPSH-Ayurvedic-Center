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
    supplierId : {
        type : String,
        required: true
        
    },
    productName : {
        type : String,
        required : true
    },
    productQty : {
        type : Number,
        required: true

    },
    price : {
        type : Number,
        required : true
    }, 
    Image:{
      data: Buffer,
      contentType: [String],
    }
})

const ShoppingCart = mongoose.model("ShoppingCart",cartShema);
module.exports = ShoppingCart;

