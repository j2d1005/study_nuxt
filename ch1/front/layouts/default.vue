<template>
<!--  <div>-->
<!--    <div>-->
<!--      <nuxt-link to="/">Home</nuxt-link>-->
<!--      <nuxt-link to="/profile">Profile</nuxt-link>-->
<!--      <nuxt-link to="/signup">SignUp</nuxt-link>-->
<!--    </div>-->
<!--    &lt;!&ndash; nuxt-link태그는 vue의 router-link태그와 같다.  &ndash;&gt;-->
<!--    &lt;!&ndash; nuxt태그는 vue의 router-view태그와 같다.  &ndash;&gt;-->
<!--    <nuxt />-->
<!--  </div>-->
  <v-app>
    <nav>
      <v-toolbar dark color="green">
        <v-toolbar-title>
          <nuxt-link to="/" :style="{ color: '#fff' }">NodeBird</nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-text-field label="검색" hide-details prepend-icon="mdi-magnify" :style="{ display: 'flex', alignItems: 'center' }" />
          <v-btn text nuxt to="/profile">
            <div>프로필</div>
          </v-btn>
          <v-btn text nuxt to="/signup">
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <login-form />
      </v-col>
      <v-col cols="12" md="8">
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
  import LoginForm from '~/components/LoginForm';

  export default {
    components: {
      LoginForm,
    },
    head() {
      return {
        title: 'NodeBird'
      };
    }
  }
</script>

<style>
  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }
</style>