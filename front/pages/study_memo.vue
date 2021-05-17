<template>
  <div>
    <!-- layouts폴더의 default.vue 파일이 가장 루트 레이아웃이 됨 -->

    <!-- nuxt-link태그는 vue의 router-link태그와 같다.  -->
    <!-- nuxt태그는 vue의 router-view태그와 같다.  -->

    <!-- vuetify 그리드 시스템 -->
    <!-- v-row로 가로 먼저 선언하고 그 안에서 v-col로 세로를 쪼갠다. -->
    <!-- cols로 12등분으로 쪼개고 md로 쪼갠영역중 몇을 사용할지 선언 보통 12그리드시스템을 많이 쓴다. -->
    <!-- xs, sm, md, lg, xl 5단계가 있고 각 브라우저 사이즈별로 사이즈를 지정할 수 있다. -->
    <!-- md에 사이즈 지정하고 그거보다 브라우저가 작아지면 100%로 꽉차는듯..?? -->
    <v-row>
      <v-col cols="12" md="4">로그인창</v-col>
      <v-col cols="12" md="8">컨텐츠</v-col>
    </v-row>

    <!-- v-btn에 nuxt to="" 지정해주면 nuxt-link의 역할을 한다. -->
    <v-btn text nuxt to="/signup">
      <div>회원가입</div>
    </v-btn>

    <v-container>
      <!--  v-container은 그냥 패딩 주는 속성  -->
    </v-container>

    <!--  v-text-field은 단순 인풋/// prepend-icon속성으로 아이콘을 줄 수 있는데  -->
    <!--  mdi-~~~~는 머터리얼디자인아이콘을 의미한다. vuetify에서는 머터리얼디자인아이콘, 머터리얼아이콘 등 거의 다 지원하기 떔에 저렇게 구분한다.  -->
    <v-text-field
      label="검색"
      hide-details
      prepend-icon="mdi-magnify"
      :style="{ display: 'flex', alignItems: 'center' }"
    />

    <!-- vuetify에서 제공하는 기능 v-form의 v-model -->
    <!--  v-form안에 있는 텍스트필드들이 rules 통과하면 자동으로 v-form에 연결한 valid가 true가 되면서 submit이 가능해진다.  -->
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
      <v-container>
        <v-text-field
          v-model="email"
          label="이메일"
          type="emial"
          :rules="emailRules"
          required
        />
        <!-- vuetify에서 제공하는 유효성 검사 속성 rules -->
        <v-text-field
          v-model="password"
          label="비밀번호"
          type="password"
          required
        />
        <v-text-field
          v-model="passwordCheck"
          label="비밀번호 확인"
          type="password"
          required
        />
      </v-container>
    </v-form>

    <div>{{ name }}</div>
    <v-btn @click="onClick">바이바이</v-btn>
  </div>
</template>

<script>
// ~/ 경로는 root를 가리킴
// import LoginForm from "~/components/LoginForm";

export default {
  // layout과 head는 nuxt에서 추가한 기능

  layout: "admin", // default 레이아웃 말고 다른 레이아웃 가져오는 경우

  head() {
    // html의 head에 해당하는 내용을 추가할 수 있다.
    // 각 페이지에서 head를 선언하지 않으면 layout의 head를 따라간다.
    // 레이아웃간 공통된 내용은 루트의 nuxt.config.js 파일에 선언한다.
    return {
      title: "NodeBird",
    };
  },
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      passwordCheck: "",
      emailRules: [
        (v) => !!v || "이메일은 필수입니다.",
        (v) => /.+@.+/.test(v) || "이메일이 유효하지 않습니다.",
      ],
    };
  },
  computed: {
    name() {
      return this.$store.state.studyStore.name;
    },
  },
  methods: {
    onSubmitForm() {
      // this.$refs.form.validate();
      // console.log(this.valid)
      if (this.$refs.form.validate()) {
        alert("submit~~");
      } else {
        alert("폼이 유효하지 않음!");
      }
    },
    onClick() {
      this.$store.commit("studyStore/bye");
    },
  },
};
</script>

<style></style>
