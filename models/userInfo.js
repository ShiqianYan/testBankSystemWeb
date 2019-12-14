let mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
  name: String,
  userName: String,
  cardNumber: String,
  phoneNumber: String,
  userPassword: String
},
{collection: "userInfo"})

module.exports = mongoose.model("userInfo", userSchema)
