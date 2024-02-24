const express = require("express")
const bodyParser = require("body-parser")
const DB = require("./database")
const app = express()
require("dotenv").config()
const session = require("express-session")
const cors = require("cors")

const port = process.env.PORT || 3000

app.use(bodyParser.json())
    .use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }))
    .use(cors({ origin: "*" }))
    .use("/", require("./routes"))

app.listen(port, () => {
    console.log(`Conntected to Server on PORT ${port}`);
})