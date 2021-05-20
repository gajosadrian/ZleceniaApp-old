import _ from 'lodash'
import localforage from 'localforage'

const ServiceTable = localforage.createInstance({
  name: 'ZleceniaApp',
  storeName: 'services',
})

export const state = () => ({
  services: [],
  timetables: [],
})

export const mutations = {
  update(state, Service) {
    ServiceTable.setItem(String(Service.id), Service)
    state.services = _.filter(
      state.services,
      (service) => service.id !== String(Service.id)
    )
    state.services.push(_.cloneDeep(Service))
  },

  remove(state, id) {
    ServiceTable.removeItem(id)
    state.services = _.filter(
      state.services,
      (service) => service.id !== String(id)
    )
  },

  clear(state) {
    state.services = []
  },
}

export const actions = {
  async init({ commit }) {
    await ServiceTable.iterate((service) => {
      commit('update', service)
    })
  },

  async fetchTimetable({ commit }, { date = null, userId = null }) {
    const res = await this.$axios.post('/zlecenia/get-from-terminarz', {
      api_token: localStorage.getItem('api_token'),
      date_string: date,
      technik_id: userId,
    })
    for (const termin of res.data.terminy) {
      console.log(termin)
    }
  },

  async clear({ commit }) {
    await ServiceTable.clear()
    commit('clear')
  },
}
