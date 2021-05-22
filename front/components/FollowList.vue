<template>
  <v-list>
    <v-col
      v-for="list in lists"
      :key="list.id"
      cols="12"
      md="4"
      style="display: inline-block"
    >
      <v-list-item>
        <v-list-item-avatar color="indigo">
          <span class="white--text headline">{{ list.nickname }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ list.nickname }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon @click="remove(list.id)">mdi-minus-circle-outline</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-col>
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
