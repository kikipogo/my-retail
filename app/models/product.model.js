const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  id: Number,
  //Composite pricing object
  current_price: {
    value: Number,
    currency_code: String
  }
});

module.exports = mongoose.model("Product", ProductSchema);
