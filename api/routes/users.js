const { Router } = require('express')
const { User } = require('../server')

const router = Router()

router.put('/user', async (req, res) => {
  const { username, password } = req.body

  try {
    await User.findOneAndUpdate({ username }, { password })

    res.status(200).end()
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
