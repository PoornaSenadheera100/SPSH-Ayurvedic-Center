const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderRef : {
        type : String,
        required : true
    },

    buyeremail : {
        type : String,
        required : true
    },

    buyername : {
        type : String,
        required : true
    },

    buyerphone : {
        type : String,
        required : true
    },

    buyeraddress : {
        type : String,
        required : true
    },

    buyernic : {
        type : String,
        required : true
    },

    totalamount : {
        type : String,
        required : true
    },

    deliveryagent : {
        type : String,
        required : true
    },

    paymentmethod : {
        type : String,
        required : true
    },

    status : {
        type : String,
        required : true
    }
})

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;