const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const feedRoutes = require('./routes/feed')

const app = express()
const port = 5000

// app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
// CORS
app.use(cors())

app.use('/feed', feedRoutes)

mongoose
  .connect('mongodb://localhost:27017/messages')
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}/`)
    })
  })
  .catch((err) => console.log(err))
