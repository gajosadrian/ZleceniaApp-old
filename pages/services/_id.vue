<template>
  <b-container>
    <ServiceHeader>{{ zlecenie.znacznik_formatted }}</ServiceHeader>
    <div>
      <div>Nr: {{ zlecenie.nr }}</div>
      <div>Nr obcy: {{ zlecenie.nr_obcy }}</div>
      <div>Termin:</div>
      <div>Przyjęcie:</div>
      <div>Czas trwania: {{ zlecenie.czas_trwania }} dni</div>
      <div>
        Umówione: {{ zlecenie.umowiono_data }}
        {{ zlecenie.umowiono_pracownik_nazwa }}
      </div>
    </div>

    <ServiceHeader>Klient #{{ zlecenie.klient.symbol }}</ServiceHeader>
    <ServiceCustomer :service="zlecenie" :customer="zlecenie.klient" />

    <ServiceHeader>{{ zlecenie.urzadzenie.nazwa }}</ServiceHeader>
    <ServiceDevice
      v-if="zlecenie.urzadzenie.id"
      :device="zlecenie.urzadzenie"
    />

    <ServiceHeader>Opis</ServiceHeader>
    <ServiceDescription :array="opisArray" />

    <div class="py-5"></div>
    <b-navbar type="dark" variant="danger" fixed="bottom">
      <b-navbar-nav>
        <b-nav-item href="#" active>Zlecenie</b-nav-item>
        <b-nav-item href="#">
          Kosztorys
          <b-badge variant="dark">0</b-badge>
        </b-nav-item>
        <b-nav-item href="#">
          Zdjęcia
          <b-badge variant="dark">0</b-badge>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
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

    opisArray() {
      return this.zlecenie.opis_array.map((notatki) => {
        return notatki.filter((notatka) => {
          if (notatka.type === 'sms') return false
          return true
        })
      })
    },
  },
}
</script>
