import localforage from 'localforage'

const ServiceTable = localforage.createInstance({
  name: 'ZleceniaApp',
  storeName: 'services',
})
window.ServiceTable = ServiceTable

export default ({ store }) => {
  ServiceTable.iterate((service) => {
    store.commit('service/update', service)
  })
}
