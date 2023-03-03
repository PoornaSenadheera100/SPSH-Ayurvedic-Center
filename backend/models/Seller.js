const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    phone : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },
})

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;