/*eslint no-unused-vars: "off"*/
let createError = require("http-errors")
let express = require("express")
let path = require("path")
let cookieParser = require("cookie-parser")
let logger = require("morgan")

let indexRouter = require("./routes/index")
let usersRouter = require("./routes/users")

const userAccounts = require("./routes/userAccounts")

let app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/users", usersRouter)

app.get("/user", userAccounts.findAllUsers)
app.get("/user/:id", userAccounts.findOneUser)
app.get("/rate", userAccounts.getRate)
app.get("/card", userAccounts.findAllCards)
app.get("/card/:id", userAccounts.findOneCard)
app.get("/cardVUN/:userName", userAccounts.findCardViaUserName)

app.post("/user", userAccounts.addUser)
app.post("/card", userAccounts.addCard)

app.put("/card/save/:id", userAccounts.saveMoney)
app.put("/card/withdraw/:id", userAccounts.withdrawMoney)
app.put("/card/purchase/:id", userAccounts.purchaseCNYForEx)
app.put("/card/settle/:id", userAccounts.settleForEx)

app.delete("/user/:id", userAccounts.deleteUser)
app.delete("/card/:id", userAccounts.deleteCard)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"))
}

module.exports = app
