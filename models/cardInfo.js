let mongoose = require("mongoose")

let cardSchema = new mongoose.Schema({
  cardNumber: String,
  CNYBalance: {type: Number, default: 0},
  EURBalance: {type: Number, default: 0},
  password: String
},
{collection: "cardInfo"})

module.exports = mongoose.model("cardInfo", cardSchema)