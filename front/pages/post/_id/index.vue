<template>
  <v-container v-if="post">
    <post-card :post="post"></post-card>
  </v-container>
  <div v-else>해당 글이 존재하지 않습니다.</div>
</template>

<!--동적라우팅-- pages폴더 내부에 폴더를 만들고 params에 해당하는 이름으로 _params.vue 파일을 만들면 됨-->

<!--page/post/_id.vue로 만들면 /post 로 접속햇을때도 _id를 찾아서 해당글이 존재하지 않는다는 페이지가 뜰 것이고-->
<!--page/post/_id/index.vue로 만들면 /post로 접속했을 때 404가 뜬다.-->
<!--동적라우팅 상황에서 파람스가 없는 경우를 제어하고 싶을 때 위에 두 상황을 구분해야 함.-->

<script>
import PostCard from "~/components/PostCard";

export default {
  components: {
    PostCard,
  },
  computed: {
    post() {
      return this.$store.state.posts.mainPosts.find(
        (v) => v.id === parseInt(this.$route.params.id, 10)
      );
    },
  },
};
</script>

<style scoped></style>
