<template>
  <b-container>
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
