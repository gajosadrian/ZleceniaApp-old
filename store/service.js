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
const TimetableIdsTable = localforage.createInstance({
  name: 'ZleceniaApp',
  storeName: 'timetableIds',
})

/**
 * STATE
 */

export const state = () => ({
  services: {},
  timetables: {},
  timetableIds: {},
})

/**
 * MUTATIONS
 */

export const mutations = {
  updateService(state, { service, update = true }) {
    const key = String(service.id)
    service = _.cloneDeep(service)
    state.services[key] = service
    if (update) ServiceTable.setItem(key, service)
  },

  updateTimetable(state, { timetable, update = true }) {
    const key = String(timetable.id)
    timetable = _.cloneDeep(timetable)
    delete timetable.zlecenie
    state.timetables[key] = timetable
    if (update) TimetableTable.setItem(key, timetable)
  },

  updateTimetableIds(state, { key, ids, update = true }) {
    state.timetableIds[key] = ids
    if (update) TimetableIdsTable.setItem(key, ids)
  },

  clear(state) {
    state.services = {}
    state.timetables = {}
    state.timetableIds = {}
  },
}

/**
 * ACTIONS
 */

export const actions = {
  async init({ commit }) {
    await ServiceTable.iterate((service) => {
      commit('updateService', { service, update: false })
    })
    await TimetableTable.iterate((timetable) => {
      commit('updateTimetable', { timetable, update: false })
    })
    await TimetableIdsTable.iterate((ids, key) => {
      commit('updateTimetableIds', { key, ids, update: false })
    })
  },

  async fetchServices({ commit }, { date = null, userId = null }) {
    const apiToken = localStorage.getItem('api_token')
    if (!apiToken) return
    const res = await this.$axios.post('/zlecenia/get-from-terminarz', {
      api_token: apiToken,
      date_string: date,
      technik_id: userId || 2,
    })
    const data = res.data
    for (const termin of data.terminy) {
      commit('updateTimetable', { timetable: termin })
      if (termin.zlecenie) commit('updateService', { service: termin.zlecenie })
    }
    const timetableIdsKey = `${data.technik.id}#${data.date_string}`
    const timetableIds = _.map(data.terminy, 'id')
    commit('updateTimetableIds', { key: timetableIdsKey, ids: timetableIds })
    return true
  },

  async clear({ commit }) {
    await ServiceTable.clear()
    await TimetableTable.clear()
    await TimetableIdsTable.clear()
    commit('clear')
  },
}
