<template>
  <b-container>
    <h1 class="title">zlecenia-app</h1>
    <div v-if="$nuxt.isOffline">Jesteś offline</div>
    <ul>
      <li v-for="service in services" :key="service.id">
        {{ service.no }} <span class="text-muted">#{{ service.id }}</span>
      </li>
    </ul>
    <b-button @click="addService()">add service</b-button>
  </b-container>
</template>

<script>
export default {
  computed: {
    services() {
      return this.$store.state.service.services
    },
  },
  methods: {
    addService() {
      const id = Math.floor(Math.random() * (1000 - 1)) + 1
      this.$store.commit('service/update', {
        id,
        no: this.randomString(10),
      })
    },
    randomString(len) {
      const charSet =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let randomString = ''
      for (let i = 0; i < len; i++) {
        const randomPoz = Math.floor(Math.random() * charSet.length)
        randomString += charSet.substring(randomPoz, randomPoz + 1)
      }
      return randomString
    },
  },
}
</script>
