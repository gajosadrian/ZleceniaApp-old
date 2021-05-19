import _ from 'lodash'
// import localforage from 'localforage'

// const ServiceTable = localforage.createInstance({
//   name: 'ZleceniaApp',
//   storeName: 'services',
// })

export const state = () => ({
  services: [],
})

export const mutations = {
  update(state, Service) {
    window.ServiceTable.setItem(String(Service.id), Service)
    state.services = _.filter(
      state.services,
      (service) => service.id !== String(Service.id)
    )
    state.services.push(_.cloneDeep(Service))
  },

  remove(state, id) {
    window.ServiceTable.removeItem(id)
    state.services = _.filter(
      state.services,
      (service) => service.id !== String(id)
    )
  },
}
