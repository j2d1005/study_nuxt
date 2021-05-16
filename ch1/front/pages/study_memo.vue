<template>
  <div>
    <!-- layouts폴더의 default.vue 파일이 가장 루트 레이아웃이 됨 -->

    <!-- nuxt-link태그는 vue의 router-link태그와 같다.  -->
    <!-- nuxt태그는 vue의 router-view태그와 같다.  -->
    <nuxt />
  </div>
</template>

<script>
  export default {
    // layout과 head는 nuxt에서 추가한 기능

    layout: "admin", // default 레이아웃 말고 다른 레이아웃 가져오는 경우

    head() {
      // html의 head에 해당하는 내용을 추가할 수 있다.
      // 각 페이지에서 head를 선언하지 않으면 layout의 head를 따라간다.
      // 레이아웃간 공통된 내용은 루트의 nuxt.config.js 파일에 선언한다.
      return {
        title: 'NodeBird'
      };
    }
  }
</script>

<style>

</style>