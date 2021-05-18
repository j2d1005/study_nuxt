<template>
  <v-list>
    <v-list-item v-for="list in lists" :key="list.id">
      <span>{{ list.nickname }}</span>
      <v-icon @click="remove(list.id)">mdi-minus-circle-outline</v-icon>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array,
      required: true,
    },
    remove: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped></style>
