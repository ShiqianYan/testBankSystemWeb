const userInfo = require("../models/userInfo")
const exchangeRate = require("../models/exchangeRate")
const cardInfo = require("../models/cardInfo")
const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()

let mongodbUri = "mongodb+srv://ShiqianYan:yan15937@banksystemweb-yx34e.mongodb.net/bankSystemWeb?retryWrites=true&w=majority"

mongoose.connect(mongodbUri)

let db = mongoose.connection

db.on("error", function (err) {
  console.log("Unable to Connect to [ " + db.name + " ]", err)
})

db.once("open", function () {
  console.log("Successfully Connected to [ " + db.name + " ]")
})

router.findAllUsers = (req, res) => {
  res.setHeader("Content-Type", "application/json")
  userInfo.find(function (err, user) {
    if (err)
      res.send(err)
    else
      res.send(JSON.stringify(user, null, 5))
  })
}

router.findOneUser = (req, res) => {
  res.setHeader("Content-Type", "application/json")
  userInfo.findById(req.params.id, function (err, user) {
    if (err)
      res.send({"message": "User Not Found", err})
    else
      res.send(JSON.stringify(user, null, 5))
  })
}

router.addUser = (req, res) => {
  res.setHeader("Content-Type", "application/json")

  let user = new userInfo()
  user.name = req.body.name
  user.userName = req.body.userName
  user.phoneNumber = req.body.phoneNumber
  user.cardNumber = req.body.cardNumber

  user.save(function (err) {
    if (err)
      res.send({"message": "User Not Added", err})
    else
      res.send({"message": "User Added Successfully", data: user})
  })
}

router.deleteUser = (req, res) => {
  userInfo.findByIdAndRemove(req.params.id, function (err) {
    if (err)
      res.send({"message": "User Not Deleted", err})
    else
      res.send({"message": "User Deleted Successfully"})
  })
}

router.findAllCards = (req, res) => {
  res.setHeader("Content-Type", "application/json")
  cardInfo.find(function (err, card) {
    if (err)
      res.send(err)
    else
      res.send(JSON.stringify(card, null, 5))
  })
}

router.findOneCard = (req, res) => {
  res.setHeader("Content-Type", "application/json")
  cardInfo.findById(req.params.id, function (err, card) {
    if (err)
      res.send({"message": "Card Not Found", err})
    else
      res.send(JSON.stringify(card, null, 5))
  })
}

router.findCardViaUserName = (req, res) => {
  res.setHeader("Content-Type", "application/json")
  userInfo.find({"userName": req.params.userName}, function (err, user) {
    if (err)
      res.send({"message": "Card Not Found"})
    else {
      cardInfo.find({"cardNumber": user[0].cardNumber}, function (err, card) {
        if (err)
          res.send(err)
        else
          res.send(JSON.stringify(card, null, 5))
      })
    }
  })
}

router.addCard = (req, res) => {
  res.setHeader("Content-Type", "application/json")

  let card = new cardInfo()
  card.cardNumber = req.body.cardNumber
  card.password = req.body.password

  card.save(function (err) {
    if (err)
      res.send({"message": "Card Not Added", err})
    else
      res.send({"message": "Card Added Successfully", data: card})
  })
}

router.deleteCard = (req, res) => {
  cardInfo.findByIdAndRemove(req.params.id, function (err, card) {
    if (err)
      res.send({"message": "Card Not Deleted", err})
    else
      res.send({"message": "Card Deleted Successfully", card})
  })
}

router.saveMoney = (req, res) => {
  cardInfo.findById(req.params.id, function (err, card) {
    if (err)
      res.send({"message": "Card Not Found", err})
    else {
      if (req.body.password !== card.password)
        res.send({"message": "Invalid Password"})
      else {
        card.EURBalance += req.body.amount
        card.save(function (err) {
          if (err)
            res.send({"message": "Money Not Saved", err})
          else
            res.send({"message": "Money Saved Successfully", card})
        })
      }
    }
  })
}

router.withdrawMoney = (req, res) => {
  cardInfo.findById(req.params.id, function (err, card) {
    if (err)
      res.send({"message": "Card Not Found", err})
    else {
      if (req.body.password !== card.password)
        res.send({"message": "Invalid Password"})
      else {
        if (req.body.amount > card.EURBalance)
          res.send({"message": "Insufficient Balance"})
        else {
          card.EURBalance -= req.body.amount
          card.save(function (err) {
            if (err)
              res.send({"message": "Money Not Withdrew", err})
            else
              res.send({"message": "Money Withdrew Successfully", card})
          })
        }
      }
    }
  })
}

router.getRate = (req, res) => {
  exchangeRate.find(function (err, rates) {
    if (err)
      res.send(err)
    else
      res.send(rates)
  })
}

router.purchaseCNYForEx = (req, res) => {
  cardInfo.findById(req.params.id, function (err, card) {
    if (err)
      res.send({"message": "Card Not Found", err})
    else {
      if (req.body.password !== card.password)
        res.send({"message": "Invalid Password"})
      else {
        if (req.body.amount > card.EURBalance)
          res.send({"message": "Insufficient EUR Balance"})
        else {
          exchangeRate.find({"_id": "5db31c421c9d4400002fc39d"}, function (err, rate) {
            if (err)
              res.send(err)
            else {
              card.EURBalance -= req.body.amount
              card.CNYBalance += req.body.amount * rate[0].fromEURtoCNY
              card.save(function (err) {
                if (err)
                  res.send(err)
                else {
                  res.send({"message": "Foreign Exchange Purchased Successfully", card})
                }
              })
            }
          }
          )
        }
      }
    }
  })
}

router.settleForEx = (req, res) => {
  cardInfo.findById(req.params.id, function (err, card) {
    if (err)
      res.send({"message": "Card Not Found", err})
    else {
      if (req.body.password !== card.password)
        res.send({"message": "Invalid Password"})
      else {
        if (req.body.amount > card.CNYBalance)
          res.send({"message": "Insufficient CNY Balance"})
        else {
          exchangeRate.find({"_id": "5db31c421c9d4400002fc39d"}, function (err, rate) {
            if (err)
              res.send(err)
            else {
              card.CNYBalance -= req.body.amount
              card.EURBalance += req.body.amount * rate[0].fromCNYtoEUR
              card.save(function (err) {
                if (err)
                  res.send(err)
                else {
                  res.send({"message": "Foreign Exchange Settled Successfully", card})
                }
              })
            }
          }
          )
        }
      }
    }
  })
}

module.exports = router