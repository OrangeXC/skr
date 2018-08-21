const { Router } = require('express')
const { Article } = require('../server')

const router = Router()
const fn = () => {}

router.get('/articles', (req, res) => {
  Article.find(req.query, null, { sort: { date: -1 } }, (err, data) => {
    if (err) res.status(500).send(err)

    res.send(JSON.stringify(data))
  })
})

router.get('/articles/:id', (req, res) => {
  const id = req.params.id

  Article.findById(id, (err, data) => {
    if (err) res.status(500).send(err)

    res.send(data)
  })
})

router.post('/articles/new', (req, res) => {
  new Article(req.body).save()

  res.status(200).end()
})

router.put('/articles/:id', (req, res) => {
  const id = req.params.id

  Article.findByIdAndUpdate(id, req.body, fn)

  res.send(req.body)
})

router.delete('/articles/:id', (req, res) => {
  Article.findByIdAndRemove(req.params.id, fn)

  res.status(200).end()
})

module.exports = router
