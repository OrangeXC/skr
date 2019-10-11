const { Router } = require('express')
const { Article } = require('../server')

const router = Router()

router.get('/tags', async (req, res) => {
  try {
    const data = await Article.find({}, ['tags'])

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
  } catch (err) {
    res.status(500).send(err)
  }
})

router.put('/tags/:name', async (req, res) => {
  const tagName = req.params.name
  const newTagName = req.body.name

  try {
    await Article.updateMany({}, {
      $addToSet: {
        tags: newTagName
      }
    })

    await Article.updateMany({}, {
      $pull: {
        tags: tagName
      }
    })

    res.status(200).end()
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/tags/:name', async (req, res) => {
  const tagName = req.params.name

  try {
    await Article.updateMany({}, {
      $pull: {
        tags: tagName
      }
    })

    res.status(200).end()
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
