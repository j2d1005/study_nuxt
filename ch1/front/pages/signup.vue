<template>
  <div>
    <v-container>
      <v-card>
        <v-subheader>회원가입</v-subheader>
        <v-form>
          <v-container>
            <v-text-field
              label="이메일"
              type="emial"
              required
            />
            <v-text-field
              label="비밀번호"
              type="password"
              required
            />
            <v-text-field
              label="비밀번호 확인"
              type="password"
              required
            />
            <v-text-field
              label="닉네임"
              type="nickname"
              required
            />
            <v-checkbox
              label="약관 동의"
              required
            />
            <v-btn color="green" type="submit">회원 가입</v-btn>
          </v-container>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'Nuxt.js'
      }
    },
    head() {
      return {
        title: '회원가입'
      }
    },
  }
</script>

<style>

</style>