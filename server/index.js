require("dotenv").config()

const express = require("express")
const session = require ('express-session')
const checkForSession = requie('./middlewares/checkForSession')
const swagController = require("./controllers/swagController")
const authController = require('./controllers/authController')
const cartController = require('./controllers/cartController')
const searchController = require('./controllers/searchController')

const app = express()
let {SERVER_PORT, SESSION_SECRET} = process.env

//middleware here
app.use(express.json())
app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    })
)
app.use(checkForSession)

//endpoints
//auth
app.get("/api/swag", swagController.read)
//auth
app.post("/api/register", authController.register)
app.post("/api/login", authController.login)
app.post("/api/signout", authController.signout)
app.get("/api/user", authController.getUser)
//cart
app.post("/api/cart/checkout", cartController.checkout)
app.post("/api/cart/:id", cartController.add)
app.delete("/api/cart/:id", cartController.delete)

app.get("/api/search", searchController.search)

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}.`)
})