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
    <b-button @click="loginUser('ag', 'haslo')">login user</b-button>
    <b-button @click="fetchZlecenia()">fetch zlecenia</b-button>
    <b-button @click="$store.dispatch('service/clear')">
      clear zlecenia
    </b-button>
    user: {{ user }}
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    }
  },
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
    async loginUser(email, password) {
      const data = await this.$axios.$post('/login-api', {
        email,
        password,
      })
      this.user = data.user
      localStorage.setItem('api_token', data.api_token)
    },
    async fetchZlecenia() {
      await this.$store.dispatch('service/fetchTimetable', {
        userId: 2,
      })
    },
  },
}
</script>
