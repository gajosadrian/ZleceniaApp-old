/**
 * STATE
 */

export const state = () => ({
  apiToken: null,
  user: null,
})

/**
 * MUTATIONS
 */

export const mutations = {
  setApiToken(state, token) {
    localStorage.setItem('api_token', token)
    state.apiToken = token
  },

  setUser(state, User) {
    localStorage.setItem('user', JSON.stringify(User))
    state.user = User
  },

  clear(state) {
    localStorage.removeItem('api_token')
    localStorage.removeItem('user')
  },
}

/**
 * ACTIONS
 */

export const actions = {
  init({ commit }) {
    const apiToken = localStorage.getItem('api_token')
    const user = localStorage.getItem('user')
    if (apiToken && user) {
      commit('setApiToken', apiToken)
      commit('setUser', JSON.parse(user))
    }
  },

  async login({ commit }, { email, password }) {
    const data = await this.$axios.$post('/login-api', {
      email,
      password,
    })
    commit('setApiToken', data.api_token)
    commit('setUser', data.user)
  },

  async fetchUser({ commit }) {
    const data = await this.$axios.$post('/user', {
      api_token: localStorage.getItem('api_token'),
    })
    commit('setUser', data.user)
  },

  clear({ commit }) {
    commit('clear')
  },
}
