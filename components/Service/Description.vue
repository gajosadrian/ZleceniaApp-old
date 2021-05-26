<template>
  <b-table-simple small borderless striped>
    <tbody>
      <template v-for="notes in array">
        <b-tr v-for="note in notes" :key="note.id">
          <!-- <b-td class="pl-2" style="width: 1%">
            <span v-if="key > 0 || (key === 0 && note.author)">
              <b-icon v-if="note.type == 'technik'" icon="wrench" />
              <b-icon v-else-if="note.type == 'sms'" icon="chat-dots" />
              <b-icon v-else icon="person-fill" />
            </span>
          </b-td> -->
          <b-td style="width: 1%" nowrap>
            <div class="font-weight-bold text-right">{{ note.author }}</div>
            <div class="text-right">
              <small>{{ note.date }}</small>
            </div>
          </b-td>
          <b-td class="px-0" style="width: 1%">
            <small><b-icon icon="caret-right-fill" /></small>
          </b-td>
          <b-td>
            {{ note.content }}
          </b-td>
        </b-tr>
      </template>
    </tbody>
  </b-table-simple>
</template>

<script>
export default {
  props: {
    array: { type: Array, default: () => [] },
  },
}
</script>
