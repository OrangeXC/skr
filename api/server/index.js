const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const consola = require('consola')
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
  views: Number,
  tags: Array,
  content: String
})

const linkSchema = new Schema({
  name: String,
  href: String
})

articleSchema.plugin(mongoosePaginate)

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
        .then(() => consola.success('Initialize successfully.'))
        .catch(() => consola.error('Something went wrong during initializing.'))
    }
  })
}

mongoose.connect('mongodb://127.0.0.1/skr', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const mongooseConnection = mongoose.connection

mongooseConnection.once('open', function () {
  consola.success('The database has connected.')
  initialize()
})

mongooseConnection.on('error', function () {
  consola.error('Database connection error.')
})

Models.mongooseConnection = mongooseConnection

module.exports = Models
