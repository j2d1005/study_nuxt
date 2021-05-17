<template>
  <v-form
    ref="form"
    v-model="valid"
    style="position: relative"
    @submit.prevent="onSubmitForm"
  >
    <v-textarea
      v-model="content"
      label="댓글"
      filled
      auto-grow
      :success-messages="successMessages"
      :success="success"
      :hide-details="hideDetails"
      @input="onChangeTextarea"
    />
    <v-btn type="submit" color="green" dark absolute top right>삐약</v-btn>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      valid: false,
      content: "",
      hideDetails: true,
      successMessages: "",
      success: false,
    };
  },
  computed: {
    ...mapState("users", ["me"]),
  },
  methods: {
    onChangeTextarea(value) {
      if (value.length) {
        this.hideDetails = true;
        this.success = false;
        this.successMessages = "";
      }
    },
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("posts/addComment", {
            content: this.content,
            User: {
              nickname: this.me.nickname,
            },
            postId: this.postId,
            id: Date.now(),
            createdAt: Date.now(),
          })
          .then(() => {
            this.content = "";
            this.hideDetails = false;
            this.success = true;
            this.successMessages = "댓글 등록 성공";
          })
          .catch(() => alert("댓글 등록 실패"));
      } else {
        alert("폼이 유효하지 않음!");
      }
    },
  },
};
</script>

<style scoped></style>
