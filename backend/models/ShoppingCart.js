const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartShema = new Schema({
    buyerID : {

    },
    itemID : {
        type : Array,
        
    },

})

const ShoppingCart = mongoose.model("ShoppingCart",cartShema);
modules.exports = ShoppingCart;

