<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      fixed="top"
      :variant="$nuxt.isOffline ? 'danger' : 'primary'"
    >
      <b-navbar-brand href="#">
        <span v-if="$nuxt.isOffline">Jesteś offline</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Zlecenia</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <Nuxt />
  </div>
</template>
