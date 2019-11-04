let mongoose = require("mongoose")

let rateSchema = new mongoose.Schema({
  fromEURtoCNY: Number,
  fromCNYtoEUR: Number,
  fromEURtoUSD: Number,
  fromUSDtoEUR: Number
},
{collection: "exchangeRate"})

module.exports = mongoose.model("exchangeRate", rateSchema)