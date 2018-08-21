const { Router } = require('express')
const { User } = require('../server')

const router = Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body

  User.findOne({ username }, 'password', (err, data) => {
    switch (true) {
      case !!err:
        res.status(401).json({ message: err })
        break
      case !data:
        res.status(401).json({ message: '账号不存在' })
        break
      case data.password === password:
        req.session.authUser = { username }
        res.json({ username })
        break
      case data.password !== password:
        res.status(401).json({ message: '密码错误' })
        break
      default:
        res.status(401).json({ message: '未知错误' })
    }
  })
})

router.post('/logout', (req, res) => {
  delete req.session.authUser

  res.json({ ok: true })
})

module.exports = router
