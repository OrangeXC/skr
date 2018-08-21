const { Router } = require('express')
const { User } = require('../server')

const router = Router()
const fn = () => {}

router.put('/user', (req, res) => {
  const { username, password } = req.body

  User.findOneAndUpdate({ username }, { password }, fn)

  res.status(200).end()
})

module.exports = router
