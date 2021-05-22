<template>
  <div>
    <v-container>
      <v-card>
        <v-subheader>회원가입</v-subheader>
        <!-- vuetify에서 제공하는 기능 v-form -->
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
          <v-container>
            <v-text-field
              v-model="email"
              label="이메일"
              type="emial"
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
            <v-text-field
              v-model="passwordCheck"
              label="비밀번호 확인"
              type="password"
              :rules="passwordCheckRules"
              required
            />
            <v-text-field
              v-model="nickname"
              label="닉네임"
              type="nickname"
              :rules="nicknameRules"
              required
            />
            <v-checkbox
              v-model="terms"
              label="약관 동의"
              :rules="termsRules"
              required
            />
            <v-btn color="green" type="submit" :disabled="!valid"
              >회원 가입</v-btn
            >
          </v-container>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      passwordCheck: "",
      nickname: "",
      terms: false,
      emailRules: [
        (v) => !!v || "이메일은 필수입니다.",
        (v) => /.+@.+/.test(v) || "이메일이 유효하지 않습니다.",
      ],
      passwordRules: [(v) => !!v || "비밀번호는 필수입니다."],
      passwordCheckRules: [
        (v) => !!v || "비밀번호 확인은 필수입니다.",
        (v) => v === this.password || "비밀번호가 일치하지 않습니다.",
      ],
      nicknameRules: [(v) => !!v || "닉네임은 필수입니다."],
      termsRules: [(v) => !!v || "약관에 동의해야 합니다."],
    };
  },
  computed: {
    ...mapState("users", ["me"]),
  },
  methods: {
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("users/singUp", {
            email: this.email,
            nickname: this.nickname,
            password: this.password,
          })
          .then(() => this.$router.push("/"))
          .catch(() => alert("로그인 실패"));
      } else {
        alert("폼이 유효하지 않음!");
      }
    },
  },
  watch: {
    me(newValue) {
      if (newValue) {
        this.$router.push("/");
      }
    },
  },
  head() {
    return {
      title: "회원가입",
    };
  },
  middleware: "anonymous",
};
</script>

<style></style>
