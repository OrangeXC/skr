const { Router } = require('express')
const { Link } = require('../server')

const router = Router()

router.get('/links', (req, res) => {
  Link.find({}, (err, data) => {
    if (err) res.status(500).end()

    res.send(data)
  })
})

router.post('/links', (req, res) => {
  const links = req.body || []

  Link.remove({})

  const promises = links
    .map(({ name, href }) => new Link({ name, href }).save())

  Promise.all(promises)
    .then(() => res.status(200).end())
    .catch(() => res.status(500).end())
})

module.exports = router
