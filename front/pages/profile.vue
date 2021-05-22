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
            <v-btn dark color="blue" type="submit">수정</v-btn>
          </v-form>
        </v-container>
      </v-card>

      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list :lists="followerList" :remove="onRemoveFollower" />
          <v-btn
            v-if="hasMoreFollower"
            dark
            color="blue"
            style="width: 100%"
            @click="onLoadFollowers"
            >더보기</v-btn
          >
        </v-container>
      </v-card>

      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list :lists="followingList" :remove="onRemoveFollowing" />
          <v-btn
            v-if="hasMoreFollowing"
            dark
            color="blue"
            style="width: 100%"
            @click="onLoadFollowings"
            >더보기</v-btn
          >
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
  // fetch는 페이지가 마운트되기전에 실행된다.
  // 마운트 전에 store에 데이터를 비동기적으로 넣을 때 사용된다.
  fetch({ store }) {
    console.log("why");
    store.dispatch("users/loadFollowerList");
    store.dispatch("users/loadFollowingList");
  },
  computed: {
    ...mapState("users", [
      "me",
      "followingList",
      "followerList",
      "hasMoreFollower",
      "hasMoreFollowing",
    ]),
  },
  methods: {
    onChangeNickname() {
      this.$store.dispatch("users/changeNickname", {
        nickname: this.nickname,
      });
    },
    ...mapActions("users", [
      "removeFollowerList",
      "removeFollowingList",
      "loadFollowerList",
      "loadFollowingList",
    ]),
    onRemoveFollower(id) {
      this.removeFollowerList({ id });
    },
    onRemoveFollowing(id) {
      this.removeFollowingList({ id });
    },
    onLoadFollowers() {
      this.loadFollowerList();
    },
    onLoadFollowings() {
      this.loadFollowingList();
    },
  },
  head() {
    return {
      title: "프로필",
    };
  },
  middleware: "authenticated",
};
</script>

<style></style>
