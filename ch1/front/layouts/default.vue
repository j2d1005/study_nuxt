<template>
  <div>
    <div>
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/profile">Profile</nuxt-link>
      <nuxt-link to="/signup">SignUp</nuxt-link>
    </div>
    <!-- nuxt-link태그는 vue의 router-link태그와 같다.  -->
    <!-- nuxt태그는 vue의 router-view태그와 같다.  -->
    <nuxt />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'NodeBird'
    };
  }
}
</script>

<style>

</style>