const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({

  ProductId: {
    type: String,
    //maxlength:5,
    required: true
  },
  Name: {
    type: String,
    maxlength:2000,
    required: true
  },
  Description:{
    type: String,
    maxlength:2000,
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
    //Buffer is similar to "Array" data type.
    //type:String
    data: Buffer,
    contentType: [String],
     // required: true,
    },
              
  });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
