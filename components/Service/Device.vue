<template>
  <div>
    <div>
      <span>Marka:</span>
      {{ device.producent }}
    </div>
    <div>
      <span>Model:</span>
      {{ device.model }}
    </div>
    <div>
      <span>Nr seryjny:</span>
      {{ device.nr_seryjny }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    device: { type: Object, default: null },
  },
}
</script>
