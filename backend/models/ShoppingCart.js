const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the schema for the shopping cart
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

// Create a model using the schema
const ShoppingCart = mongoose.model("ShoppingCart",cartShema);

// Export the model for use in other files
module.exports = ShoppingCart;

