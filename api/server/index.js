const mongoose = require('mongoose')
const init = require('./init.json')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String
})

const articleSchema = new Schema({
  title: String,
  date: Date,
  status: String,
  content: String
})

const linkSchema = new Schema({
  name: String,
  href: String
})

const Models = {
  User: mongoose.model('User', userSchema),
  Article: mongoose.model('Article', articleSchema),
  Link: mongoose.model('Link', linkSchema)
}

const initialize = function () {
  Models.User.find(null, function (err, data) {
    if (err) {
      console.log(err)

      return
    }

    if (!data.length) {
      console.log('Database opens for the first time...')

      Promise.all(init.map(item => new Models[item.type](item).save()))
        .then(() => console.log('Initialize successfully.'))
        .catch(() => console.log('Something went wrong during initializing.'))
    }
  })
}

mongoose.connect('mongodb://127.0.0.1/blog', {
  useNewUrlParser: true
})

const mongooseConnection = mongoose.connection

mongooseConnection.on('error', function () {
  console.log('Database connection error.')
})

mongooseConnection.once('open', function () {
  console.log('The database has connected.')
  initialize()
})

Models.mongooseConnection = mongooseConnection

module.exports = Models
