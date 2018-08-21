import axios from '~/plugins/axios'

export const state = () => ({
  authUser: null,
  links: []
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  },
  SET_LINK: function (state, links) {
    state.links = links
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }

    const { data } = await axios.get('/api/links')

    commit('SET_LINK', data)
  },
  async login ({ commit }, { username, password }) {
    try {
      const { data } = await axios.post('/api/login', { username, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async logout ({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  }
}
