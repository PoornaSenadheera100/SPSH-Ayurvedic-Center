const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description:{
    String,
    required: true
  }, 
  price: {
    type: Number,
    required: true
  },
  quantity:{
    Number,
    required: true
  }, 
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  image:{
    type: BinData,
    required: true
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
