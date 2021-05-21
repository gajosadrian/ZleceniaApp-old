import _ from 'lodash'
import localforage from 'localforage'

const ServiceTable = localforage.createInstance({
  name: 'ZleceniaApp',
  storeName: 'services',
})
const TimetableTable = localforage.createInstance({
  name: 'ZleceniaApp',
  storeName: 'timetables',
})

/**
 * STATE
 */

export const state = () => ({
  services: [],
  timetables: [],
  timetableIds: [],
})

/**
 * MUTATIONS
 */

export const mutations = {
  updateService(state, Service) {
    Service = _.cloneDeep(Service)
    ServiceTable.setItem(String(Service.id), Service)
    state.services = _.filter(
      state.services,
      (service) => service.id !== Service.id
    )
    state.services.push(Service)
  },
  removeService(state, id) {
    ServiceTable.removeItem(id)
    state.services = _.filter(
      state.services,
      (service) => service.id !== String(id)
    )
  },

  updateTimetable(state, Timetable) {
    Timetable = _.cloneDeep(Timetable)
    delete Timetable.zlecenie
    TimetableTable.setItem(String(Timetable.id), Timetable)
    state.timetables = _.filter(
      state.timetables,
      (timetable) => timetable.id !== Timetable.id
    )
    state.timetables.push()
  },

  clear(state) {
    state.services = []
    state.timetables = []
    state.timetableIds = []
  },
}

/**
 * ACTIONS
 */

export const actions = {
  async init({ commit }) {
    await ServiceTable.iterate((service) => {
      commit('updateService', service)
    })
  },

  async fetchServices({ commit }, { date = null, userId = null }) {
    const res = await this.$axios.post('/zlecenia/get-from-terminarz', {
      api_token: localStorage.getItem('api_token'),
      date_string: date,
      technik_id: userId,
    })
    const data = res.data
    for (const termin of data.terminy) {
      commit('updateTimetable', termin)
      if (termin.zlecenie) commit('updateService', termin.zlecenie)
    }
    // TODO
    // const timetableIds = _.map(data.terminy, 'id')
  },

  async clear({ commit }) {
    await ServiceTable.clear()
    await TimetableTable.clear()
    commit('clear')
  },
}
