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

  try {
    const { docs, total } = await Article.paginate(query, options)

    res.send({
      articles: docs,
      total
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/admin/articles', async (req, res) => {
  const options = {
    select: 'title date status views',
    sort: { date: -1 },
    page: req.query.page
  }

  try {
    const { docs, total } = await Article.paginate({}, options)

    res.send({
      articles: docs,
      total
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/articles/:id', async (req, res) => {
  const id = req.params.id
  const update = {}

  if (!req.session.authUser) {
    update.$inc = { views: 1 }
  }

  try {
    const data = await Article.findByIdAndUpdate(id, update)

    res.send(data)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/articles/new', async (req, res) => {
  req.body.views = 0

  try {
    await new Article(req.body).save()

    res.status(200).end()
  } catch (err) {
    res.status(500).send(err)
  }
})

router.put('/articles/:id', async (req, res) => {
  const id = req.params.id

  try {
    await Article.findByIdAndUpdate(id, req.body, {
      new: true
    })

    res.send(req.body)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/articles/:id', async (req, res) => {
  try {
    Article.findByIdAndRemove(req.params.id)

    res.status(200).end()
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
