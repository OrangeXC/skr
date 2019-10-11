const { Router } = require('express')
const { User } = require('../server')

const router = Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const data = await User.findOne({ username }, 'password')

    switch (true) {
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
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/logout', (req, res) => {
  delete req.session.authUser

  res.status(200).end()
})

module.exports = router
