const { Router } = require('express')
const { Article } = require('../server')

const router = Router()

router.get('/tags', (req, res) => {
  Article.find({}, ['tags'], (err, data) => {
    if (err) res.status(500).send(err)

    const tagsArr = data.map(({ tags }) => tags)
    const tags = Array.prototype.concat.apply([], tagsArr)

    res.send([...new Set(tags)])
  })
})

module.exports = router
