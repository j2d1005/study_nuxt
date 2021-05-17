<template>
  <!--  v-container은 그냥 패딩 주는 속성  -->
  <v-container>
    <!-- 로그인 전 -->
    <v-card v-if="!me">
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container>
          <v-text-field
            v-model="email"
            label="이메일"
            type="email"
            :rules="emailRules"
            required
          />
          <v-text-field
            v-model="password"
            label="비밀번호"
            type="password"
            :rules="passwordRules"
            required
          />
          <v-btn color="green" type="submit" :disabled="!valid">로그인</v-btn>
          <v-btn nuxt to="signup">회원가입</v-btn>
        </v-container>
      </v-form>
    </v-card>

    <!-- 로그인 완료 -->
    <v-card v-else>
      <v-container>
        {{ me.nickname }}님 로그인 되었습니다.
        <v-btn @click="onLogout" style="display: block">로그아웃</v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "이메일은 필수입니다.",
        (v) => /.+@.+/.test(v) || "이메일이 유효하지 않습니다.",
      ],
      passwordRules: [(v) => !!v || "비밀번호는 필수입니다."],
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
  },
  methods: {
    onSubmitForm() {
      // this.$refs.form.validate();
      // console.log(this.valid)
      if (this.$refs.form.validate()) {
        this.$store.dispatch("users/logIn", {
          email: this.email,
          nickname: "더미닉네임",
        });
      } else {
        alert("폼이 유효하지 않음!");
      }
    },
    onLogout() {
      this.$store.dispatch("users/logOut");
    },
  },
};
</script>

<style scoped></style>
