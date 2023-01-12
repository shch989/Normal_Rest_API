const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')

const feedRoutes = require('./routes/feed')
const authRoutes = require('./routes/auth')

const app = express()

const port = 5000

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()) // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
)
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/feed', feedRoutes)
app.use('/auth', authRoutes)

app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({ message: message, data: data })
})

mongoose
  .connect('mongodb://localhost:27017/messages', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}/`)
    })
    const io = require('./socket').init(server)
    io.on('connection', socket => {
      console.log('Client connected')
    })
  })
  .catch((err) => console.log(err))
