<template>
  <b-container>
    <div class="mt-2">
      <h4>Zlecenia: {{ user.technik.nazwa }}</h4>
      <div class="d-flex justify-content-between">
        <div>
          <div>
            <b-button variant="light" class="border" @click="fetchServices()">
              <b-icon icon="arrow-clockwise" />
              Synchronizuj listę
            </b-button>
          </div>
        </div>
        <div>
          <b-input v-model="timetableDate" type="date" class="bg-light" />
        </div>
      </div>
    </div>
    <hr />

    <div v-for="termin in terminy" :key="termin.id">
      <div v-if="termin.klient" class="d-flex justify-content-between">
        <div class="w-100 pr-2" @click="onTerminClick(termin)">
          <div>
            <b-badge
              v-if="!termin.zlecenie || !termin.zlecenie.is_do_wyjasnienia"
              variant="light"
            >
              <b-icon icon="clock-fill" />
              {{ termin.godzina_rozpoczecia }} -
              {{ termin.przeznaczony_czas_formatted }}
            </b-badge>
            <b-badge v-if="termin.zlecenie" variant="light">
              {{ termin.zlecenie.znacznik_formatted }}
            </b-badge>
          </div>
          <div v-if="termin.klient">
            <div class="font-weight-bold">{{ termin.klient.nazwa }}</div>
            <div>{{ termin.klient.adres }}</div>
            <div>
              {{ termin.klient.kod_pocztowy }}
              {{ termin.klient.miasto_short }}
            </div>
          </div>
          <div class="text-muted">
            <b-badge
              v-if="termin.zlecenie && termin.zlecenie.is_do_wyjasnienia"
              class="border border-danger bg-transparent text-danger"
            >
              <b-icon icon="exclamation-triangle-fill" />
              Do wyjaśnienia
            </b-badge>
            <b-badge
              v-else-if="termin.zlecenie && termin.zlecenie.is_warsztat"
              variant="light"
            >
              <b-icon icon="house-door-fill" />
              Warsztat
            </b-badge>
            <b-badge
              v-else-if="termin.zlecenie && termin.zlecenie.is_soft_zakonczone"
              variant="success"
            >
              <b-icon icon="check2" />
              Zrealizowane
            </b-badge>
            <b-badge
              v-else-if="termin.zlecenie && !termin.zlecenie.is_umowiono"
              variant="danger"
            >
              <b-icon icon="clock-fill" />
              Nieumówione
            </b-badge>
            <b-badge
              v-else-if="termin.zlecenie && termin.zlecenie.is_dzwonic"
              variant="primary"
            >
              <b-icon icon="clock-fill" />
              Dzwonić wcześniej
            </b-badge>
            <b-badge
              v-else-if="termin.zlecenie && !termin.zlecenie.is_soft_zakonczone"
              variant="light"
            >
              <b-icon icon="clock-fill" />
              Oczekujące...
            </b-badge>
            <b-badge v-else variant="success">
              <b-icon icon="x" />
              Termin usunięty
            </b-badge>
          </div>
          <div v-if="termin.zlecenie">
            <div v-if="termin.zlecenie.urzadzenie.id" class="text-right">
              <div>
                {{
                  _.truncate(termin.zlecenie.urzadzenie.nazwa, { length: 20 })
                }},
                {{ termin.zlecenie.urzadzenie.producent }}
              </div>
              <div>
                {{
                  _.truncate(termin.zlecenie.urzadzenie.model, { length: 25 })
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="border-left pl-2">
          <div>
            <b-button
              v-if="termin.zlecenie && termin.zlecenie.is_do_wyjasnienia"
              variant="danger"
              disabled
            >
              <b-icon icon="exclamation-triangle-fill" />
            </b-button>
            <b-button
              v-else-if="termin.zlecenie && termin.zlecenie.is_warsztat"
              variant="warning"
              disabled
            >
              <b-icon icon="house-door-fill" />
            </b-button>
            <b-link
              v-else-if="termin.zlecenie && !termin.zlecenie.is_soft_zakonczone"
              :href="`intent://q=${termin.klient.adres_search}/#Intent;package=pl.aqurat.automapa;scheme=geo;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`"
              :class="
                !termin.zlecenie.is_umowiono || termin.zlecenie.is_dzwonic
                  ? 'btn btn-outline-primary'
                  : 'btn btn-primary'
              "
            >
              <b-icon icon="cursor-fill" />
            </b-link>
            <b-button
              v-else-if="termin.zlecenie && termin.zlecenie.is_soft_zakonczone"
              variant="success"
              disabled
            >
              <b-icon icon="check2" />
            </b-button>
            <b-button v-else variant="success" disabled>
              <b-icon icon="x" />
            </b-button>
          </div>
          <div class="mt-2">
            <b-link
              v-if="
                termin.zlecenie &&
                ((!termin.zlecenie.is_soft_zakonczone &&
                  !termin.zlecenie.is_do_wyjasnienia &&
                  !termin.zlecenie.is_umowiono &&
                  !termin.zlecenie.is_warsztat) ||
                  termin.zlecenie.is_dzwonic)
              "
              :href="`tel:${termin.klient.telefon}`"
              class="btn btn-success"
            >
              <b-icon icon="telephone-fill" />
            </b-link>
          </div>
        </div>
      </div>
      <div v-else>
        <b-alert variant="info" class="p-2" show>
          <div>
            <b-badge variant="info">
              <b-icon icon="clock-fill" />
              {{ termin.godzina_rozpoczecia }} -
              {{ termin.przeznaczony_czas_formatted }}
            </b-badge>
          </div>
          <div v-if="termin.zlecenie" class="font-weight-bold mt-2">
            <div>{{ termin.zlecenie.adres }}</div>
            <div>
              {{ termin.zlecenie.kod_pocztowy }} {{ termin.zlecenie.miasto }}
            </div>
          </div>
          <div class="mt-2">
            {{ termin.temat }}
          </div>
        </b-alert>
      </div>
      <hr />
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      timetableIds: [],
      timetableUserId: 0,
      timetableDate: this.$route.query.date || '',
    }
  },

  computed: {
    terminy() {
      const array = []
      for (const terminId of this.timetableIds) {
        const termin = this.$store.state.service.timetables[terminId]
        termin.zlecenie = this.$store.state.service.services[termin.zlecenie_id]
        array.push(termin)
      }
      return array
    },

    user() {
      return this.$store.state.user.user
    },
  },

  watch: {
    timetableDate(date) {
      if (!date) return
      this.$router.replace({
        name: 'services',
        query: { date },
      })
      this.getTimetableIds()
      this.fetchServices()
    },
  },

  created() {
    this.timetableUserId = this.user.technik_id
    if (!this.timetableDate) {
      const now = new Date()
      const yyyy = now.getFullYear()
      const mm = ('0' + (now.getMonth() + 1)).slice(-2)
      const dd = ('0' + now.getDate()).slice(-2)
      this.timetableDate = `${yyyy}-${mm}-${dd}`
    }
    this.getTimetableIds()
  },

  methods: {
    onTerminClick(termin) {
      const zlecenie = termin.zlecenie
      if (zlecenie) {
        // window.navigator.vibrate(20)
        this.clickSound.play()
        this.$router.push({
          name: 'services-id',
          params: { id: zlecenie.id },
        })
      }
    },

    getTimetableIds() {
      this.timetableIds =
        this.$store.state.service.timetableIds[
          `${this.timetableUserId}#${this.timetableDate}`
        ] || []
    },

    fetchServices() {
      this.$store
        .dispatch('service/fetchServices', { date: this.timetableDate })
        .then(() => {
          this.getTimetableIds()
        })
    },
  },
}
</script>
