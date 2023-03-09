const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({

  ProductId: {
    type: String,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  Description:{
    type: String,
    required: true
  }, 
  Price: {
    type: Number,
    required: true
  },
  Quantity:{
    type: Number, 
    required: true
  }, 
  Image:{
    //Buffer sis similar to "Array" data type.
    data: Buffer,
    contentType:String,
  }
});
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
