<template>
  <div>
    <v-container>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>내 프로필</v-subheader>
          <v-form ref="form" v-model="valid" @submit.prevent="onChangeNickname">
            <v-text-field
              label="닉네임"
              v-model="nickname"
              :rules="[(v) => !!v || '닉네임을 입력해 주세요']"
              required
            />
            <v-btn color="blue" type="submit">수정</v-btn>
          </v-form>
        </v-container>
      </v-card>

      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list />
        </v-container>
      </v-card>

      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list />
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FollowList from "~/components/FollowList";

export default {
  components: {
    FollowList,
  },
  data() {
    return {
      valid: false,
      nickname: this.me?.nickname,
    };
  },
  computed: {
    ...mapState("users", ["me"]),
  },
  methods: {
    onChangeNickname() {
      this.$store.dispatch("users/changeNickname", {
        nickname: this.nickname,
      });
    },
  },
  head() {
    return {
      title: "프로필",
    };
  },
};
</script>

<style></style>
