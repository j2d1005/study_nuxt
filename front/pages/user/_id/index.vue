<template>
  <v-container>
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
    mainPost() {
      return this.$store.state.posts.mainPosts;
    },
    hasMorePost() {
      return this.$store.state.posts.hasMorePost;
    },
  },
  // fetch는 페이지가 마운트되기전에 실행된다.
  // 마운트 전에 store에 데이터를 비동기적으로 넣을 때 사용된다.
  fetch({ store }) {
    store.dispatch("posts/loadPosts");
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      // window.scrollY - 현재 스크롤 높이
      // document.documentElement.clientHeight - 브라우저 세로크기
      // document.documentElement.scrollHeight - 페이지 전체 height
      // window.scrollY + document.documentElement.clientHeight === document.documentElement.scrollHeight 라면 스크롤 최하단
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (this.hasMorePost) {
          this.$store.dispatch("posts/loadPosts");
        }
      }
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
