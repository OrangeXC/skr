const express = require('express')

const router = express.Router()

// Create express instnace
const app = express()
const whiteList = ['/articles', '/links']

function isAllowUrl ({ url, method }) {
  let flag = false

  whiteList.some(item => {
    if (url === '/login') {
      flag = true

      return true
    }

    if (method === 'GET' && url.indexOf(item) === 0) {
      flag = true

      return true
    }
  })

  return flag
}

app.use((req, res, next) => {
  if (isAllowUrl(req)) {
    next()
  } else {
    if (req.session && req.session.authUser) {
      next()
    } else {
      res.status(401).json({ message: '无权限访问' })
    }
  }
})

// Set req and res
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Require API routes
const auth = require('./routes/auth')
const users = require('./routes/users')
const articles = require('./routes/articles')
const links = require('./routes/links')

// Import API Routes
app.use(auth)
app.use(users)
app.use(articles)
app.use(links)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
