<template>
  <b-container>
    <h1>ZleceniaApp</h1>
    <div v-if="$nuxt.isOffline">Jesteś offline</div>
    <b-card v-if="!user" title="Logowanie">
      <b-form-group>
        <b-input v-model="auth.email" placeholder="Login" type="text" />
      </b-form-group>
      <b-form-group>
        <b-input v-model="auth.password" placeholder="Hasło" type="password" />
      </b-form-group>
      <b-button @click="loginUser('ag', 'haslo')">Zaloguj</b-button>
    </b-card>
    <b-card v-else class="mt-2">
      <div>
        Zalogowany:
        <span class="font-weight-bold">{{ user ? user.name : '' }}</span>
      </div>
    </b-card>
    <b-card class="mt-2" title="Zlecenia">
      <b-form-group>
        <b-button @click="fetchZlecenia()">pobierz zlecenia</b-button>
        <b-button @click="$store.dispatch('service/clear')">
          clear zlecenia
        </b-button>
      </b-form-group>
      <ul>
        <li v-for="zlecenie in services" :key="zlecenie.id">
          {{ zlecenie.nr }} <span class="text-muted">#{{ zlecenie.id }}</span>
        </li>
      </ul>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      auth: {
        email: '',
        password: '',
      },
      user: null,
    }
  },
  computed: {
    services() {
      return this.$store.state.service.services
    },
  },
  methods: {
    async loginUser() {
      const data = await this.$axios.$post('/login-api', {
        email: this.auth.email,
        password: this.auth.password,
      })
      this.user = data.user
      localStorage.setItem('api_token', data.api_token)
    },
    async fetchZlecenia() {
      await this.$store.dispatch('service/fetchServices', {
        userId: 2,
      })
    },
  },
}
</script>
