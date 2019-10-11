const { Router } = require('express')
const { Link } = require('../server')

const router = Router()

router.get('/links', async (req, res) => {
  try {
    const data = await Link.find({})

    res.send(data)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/links', async (req, res) => {
  const links = req.body || []

  try {
    await Link.deleteMany({})

    const promises = links
      .map(({ name, href }) => new Link({ name, href }).save())

    await Promise.all(promises)

    res.status(200).end()
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
