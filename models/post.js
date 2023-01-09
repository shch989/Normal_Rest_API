const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: Object,
      requirefd: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
