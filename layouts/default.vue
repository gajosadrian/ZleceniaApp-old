<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      fixed="top"
      sticky
      :variant="$nuxt.isOffline ? 'danger' : 'primary'"
    >
      <b-navbar-brand href="#">
        <span v-if="$nuxt.isOffline">Jesteś offline</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <NuxtLink :to="{ name: 'services' }" tag="b-nav-item">
            Zlecenia
          </NuxtLink>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="user" :text="user.short_name" right>
            <b-dropdown-item @click="logoutUser()">Wyloguj</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <Nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.user
    },
  },

  methods: {
    logoutUser() {
      this.$store.dispatch('user/clear')
    },
  },
}
</script>

<style>
body {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
