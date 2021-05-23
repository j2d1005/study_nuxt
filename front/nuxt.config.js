// layout간에 head가 겹치면 여기서 공통으로 선언할 수 있다!

// eslint-disable-next-line nuxt/no-cjs-in-config
module.exports = {
  head: {
    title: "NodeBird",
  },
  modules: [
    // Vue에서 전역에 Vue.use(''); 선언하는것고 동일하다. nuxt에서는 여기다가 선언한다.
    "@nuxtjs/vuetify",
    "@nuxtjs/axios",
  ],
  vuetify: {},

  // axios: {
  //   proxy: true,
  // },
  //
  // proxy: {
  //   "/api/": "http://localhost:3085/",
  // },
};
