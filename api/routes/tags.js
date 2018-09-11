const { Router } = require('express')
const { Article } = require('../server')

const router = Router()

router.get('/tags', (req, res) => {
  Article.find({}, ['tags'], (err, data) => {
    if (err) res.status(500).send(err)

    const tagsArr = Array.prototype.concat.apply([],
      data.map(({ tags }) => tags)
    )

    let tags = []

    if (req.query.withArticleCount) {
      tagsArr.forEach(item => {
        const tag = tags.find(({ name }) => name === item)

        tag
          ? tag.articleCount += 1
          : tags.push({ name: item, articleCount: 1 })
      })
    } else {
      tags = [...new Set(tagsArr)]
    }

    res.send(tags)
  })
})

router.put('/tags/:name', async (req, res) => {
  const tagName = req.params.name
  const newTagName = req.body.name

  await Article.updateMany({}, {
    $addToSet: {
      tags: newTagName
    }
  }, (err) => {
    if (err) res.status(500).send(err)
  })

  Article.updateMany({}, {
    $pull: {
      tags: tagName
    }
  }, (err) => {
    if (err) res.status(500).send(err)

    res.status(200).end()
  })
})

router.delete('/tags/:name', (req, res) => {
  const tagName = req.params.name

  Article.updateMany({}, {
    $pull: {
      tags: tagName
    }
  }, (err) => {
    if (err) res.status(500).send(err)

    res.status(200).end()
  })
})

module.exports = router
