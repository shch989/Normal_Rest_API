const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const multer = require('multer')
// const { v4: uuidv4 } = require('uuid')
const cors = require('cors')

const feedRoutes = require('./routes/feed')
const authRoutes = require('./routes/auth')

const app = express()
const port = 5000

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images')
//   },
//   filename: (req, file, cb) => {
//     cb(null, uuidv4())
//   },
// })

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     cb(null, true)
//   } else {
//     cb(null, false)
//   }
// }

// app.use(bodyParser.urlencoded())
// app.use(bodyParser.json())
// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
// )
// CORS
app.use(cors())

app.use('/feed', feedRoutes)
app.use('/auth', authRoutes)

mongoose
  .connect('mongodb://localhost:27017/messages')
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}/`)
    })
  })
  .catch((err) => console.log(err))
