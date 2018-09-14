const { Router } = require('express')
const { Article } = require('../server')

const router = Router()

router.get('/articles', async (req, res) => {
  const query = {
    status: 'published'
  }

  const options = {
    select: 'title date views tags',
    sort: { date: -1 },
    page: req.query.page
  }

  if (req.query.tag) query.tags = req.query.tag

  Article.paginate(query, options, (err, { docs, total }) => {
    if (err) res.status(500).send(err)

    res.send({
      articles: docs,
      total
    })
  })
})

router.get('/admin/articles', (req, res) => {
  const options = {
    select: 'title date status views',
    sort: { date: -1 },
    page: req.query.page
  }

  Article.paginate({}, options, (err, { docs, total }) => {
    if (err) res.status(500).send(err)

    res.send({
      articles: docs,
      total
    })
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

router.put('/articles/:id', async (req, res) => {
  const id = req.params.id

  await Article.findByIdAndUpdate(id, req.body, {
    new: true
  })

  res.send(req.body)
})

router.delete('/articles/:id', (req, res) => {
  Article.findByIdAndRemove(req.params.id)

  res.status(200).end()
})

module.exports = router
