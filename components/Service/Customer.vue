<template>
  <div>
    <!-- <div>
      <b-badge>{{ customer.symbol }}</b-badge>
    </div> -->
    <div class="font-weight-bold">{{ customer.nazwa }}</div>
    <div>{{ customer.adres }}</div>
    <div>
      {{ customer.kod_pocztowy }}
      {{ customer.miasto_short }}
    </div>
    <div class="py-2">
      <b-button
        v-for="(telefon, key) in customer.telefony"
        :key="key"
        :href="`tel:${telefon}`"
        variant="light"
        size="sm"
        class="border mr-2"
      >
        <b-icon icon="telephone-fill" variant="success" />
        {{ telefon }}
      </b-button>
    </div>
    <div class="pt-2">
      <b-button
        :href="`https://www.google.com/maps/search/?api=1&query=${customer.adres_search}`"
        variant="light"
        size="sm"
        class="border mr-1"
      >
        <b-icon icon="geo-alt-fill" variant="primary" />
        Mapy
      </b-button>
      <b-button
        v-clipboard:copy="customer.adres_search"
        href="https://play.google.com/store/apps/details?id=pl.neptis.yanosik.mobi.android&launch=true"
        variant="light"
        size="sm"
        class="border mr-1"
      >
        <b-icon icon="cursor-fill" variant="danger" />
        Yanosik
      </b-button>
      <b-button
        :href="`intent://q=${customer.adres_search}/#Intent;package=pl.aqurat.automapa;scheme=geo;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`"
        variant="light"
        size="sm"
        class="border mr-1"
      >
        <b-icon icon="capslock-fill" variant="secondary" />
        Automapa
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    service: { type: Object, default: null },
    customer: { type: Object, default: null },
  },
}
</script>
