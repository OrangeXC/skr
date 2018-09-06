const { Router } = require('express')
const { User } = require('../server')

const router = Router()

router.put('/user', (req, res) => {
  const { username, password } = req.body

  User.findOneAndUpdate({ username }, { password })

  res.status(200).end()
})

module.exports = router
