<template>
  <v-container>
    <post-form v-if="me" />
    <div>
      <post-card v-for="post in mainPost" :key="post.id" :post="post" />
    </div>
  </v-container>
</template>

<script>
import PostCard from "~/components/PostCard";
import PostForm from "~/components/PostForm";

export default {
  components: {
    PostCard,
    PostForm,
  },
  data() {
    return {
      name: "Nuxt.js",
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    mainPost() {
      return this.$store.state.posts.mainPosts;
    },
  },
  head() {
    return {
      title: "메인페이지",
    };
  },
};
</script>

<style></style>
