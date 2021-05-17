<template>
  <v-container>
    <post-card />
    <post-card />
    <post-card />
    <post-card />
    <post-card />
  </v-container>
</template>

<script>
  import PostCard from "~/components/PostCard";

  export default {
    components: {
      PostCard,
    },
    data() {
      return {
        name: 'Nuxt.js'
      }
    },
    head() {
      return {
        title: '메인페이지'
      }
    },
  }
</script>

<style>

</style>