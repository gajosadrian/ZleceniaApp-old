export default async ({ store }) => {
  store.dispatch('user/init')
  await store.dispatch('service/init')
  store.dispatch('user/fetchUser')
}
