export default async ({ store }) => {
  store.dispatch('user/init')
  await store.dispatch('user/fetchUser')
  await store.dispatch('service/init')
}
