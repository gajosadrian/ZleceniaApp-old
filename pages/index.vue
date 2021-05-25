<template>
  <b-container>
    <h3 class="mt-2">Zlecenia</h3>
    <hr />

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
      <div>
        Zlecenia:
        <span class="font-weight-bold">
          {{ user && user.is_technik ? user.technik.nazwa : '' }}
        </span>
      </div>
    </b-card>
    <b-card class="my-2">
      <b-button @click="fetchZlecenia()">pobierz zlecenia</b-button>
      <b-button @click="$store.dispatch('service/clear')">
        clear zlecenia
      </b-button>
    </b-card>

    <div v-for="(zlecenie, key) in zlecenia" :key="zlecenie.id">
      <div class="d-flex justify-content-between">
        <div>
          <div class="text-muted">
            <small>{{ zlecenie.znacznik_formatted }}</small>
          </div>
          <div v-if="zlecenie.klient" class="font-weight-bold">
            {{ zlecenie.klient.nazwa }}
          </div>
          <div v-if="zlecenie.urzadzenie">
            <div>{{ zlecenie.urzadzenie.nazwa }}</div>
            <div>{{ zlecenie.urzadzenie.producent }}</div>
          </div>
          <div class="text-muted">
            <small v-if="key === 0">✔️ Zrealizowane</small>
            <small v-else-if="key === 1">⏲️ Oczekujące...</small>
            <small v-else-if="key === 2">❌ Nieumówione</small>
            <small v-else>⏲️ Oczekujące...</small>
          </div>
        </div>
        <div>
          <b-button variant="light" size="sm">🗺️</b-button>
        </div>
      </div>
      <hr />
    </div>
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
    }
  },
  computed: {
    zlecenia() {
      return this.$store.state.service.services
    },
    user() {
      return this.$store.state.user.user
    },
  },
  methods: {
    async loginUser() {
      await this.$store.dispatch('user/login', {
        email: this.auth.email,
        password: this.auth.password,
      })
      this.auth.email = ''
      this.auth.password = ''
    },
    async fetchZlecenia() {
      await this.$store.dispatch('service/fetchServices', {
        userId: 2,
      })
    },
  },
}
</script>
