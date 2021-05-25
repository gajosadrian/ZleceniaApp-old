<template>
  <b-container>
    <div>{{ serviceId }}</div>
    <div>{{ zlecenie.opis }}</div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {}
  },

  computed: {
    serviceId() {
      return this.$route.params.id
    },

    zlecenie() {
      return this.$store.state.service.services[this.serviceId] || null
    },
  },
}
</script>
