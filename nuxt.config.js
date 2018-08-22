import bodyParser from 'body-parser'
import session from 'express-session'
import { mongooseConnection } from './api/server'

const MongoStore = require('connect-mongo')(session)

module.exports = {
  head: {
    title: 'Skr',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~/assets/css/main.css'
  ],
  plugins: [
    '~plugins/filters.js',
    '~plugins/element.js',
    { src: '~plugins/mavon-editor', ssr: false }
  ],
  build: {
    // Run ESLINT on save
    extend (config, ctx) {
      if (ctx.isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    babel: {
      plugins: [
        ['component', {
          libraryName: 'element-ui',
          styleLibraryName: 'theme-chalk'
        }]
      ]
    }
  },
  serverMiddleware: [
    bodyParser.json(),
    // session middleware
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
      }
    }),
    // API middleware
    '~/api'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@digibytes/markdownit'
  ],
  markdownit: {
    injected: true
  }
}
