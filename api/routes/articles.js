const { Router } = require('express')
const { Article } = require('../server')

const router = Router()
const fn = () => {}

router.get('/articles', (req, res) => {
  const query = {
    status: 'published'
  }
  const fields = ['title', 'date', 'views']
  const options = {
    sort: { date: -1 }
  }

  Article.find(query, fields, options, (err, data) => {
    if (err) res.status(500).send(err)

    res.send(JSON.stringify(data))
  })
})

router.get('/admin/articles', (req, res) => {
  const fields = ['title', 'date', 'status', 'views']
  const options = {
    sort: { date: -1 }
  }

  Article.find({}, fields, options, (err, data) => {
    if (err) res.status(500).send(err)

    res.send(JSON.stringify(data))
  })
})

router.get('/articles/:id', (req, res) => {
  const id = req.params.id
  const update = {}

  if (!req.session.authUser) {
    update.$inc = { views: 1 }
  }

  Article.findByIdAndUpdate(id, update, (err, data) => {
    if (err) res.status(500).send(err)

    res.send(data)
  })
})

router.post('/articles/new', (req, res) => {
  req.body.views = 0

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
