const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rateSchema = new Schema({
    itemID : {
        type : String,
        required : true
    },

    buyerEmail : {
        type : String,
        required : true
    },

    ratingCount : {
        type : Number,
        required : true
    },

    avgRate : {
        type : Number,
        required : true
    }
})

const Rate = mongoose.model("Rate", rateSchema);

module.exports = Rate;