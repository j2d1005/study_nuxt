export const state = () => ({
  me: null, // me에 객체가 들어오면 로그인이 된 상태
  followingList: [
    // { id: 1, nickname: "HONGSAM1" },
    // { id: 2, nickname: "HONGSAM2" },
    // { id: 3, nickname: "HONGSAM3" },
  ],
  followerList: [
    // { id: 1, nickname: "HONGSAM1" },
    // { id: 2, nickname: "HONGSAM2" },
    // { id: 3, nickname: "HONGSAM3" },
  ],
  hasMoreFollower: true,
  hasMoreFollowing: true,
});

const totalFollowers = 8;
const totalFollowings = 8;
const limit = 3;

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname;
  },
  addFollowingList(state, payload) {
    state.followingList.push(payload);
  },
  removeFollowingList(state, payload) {
    const index = state.followingList.findIndex((v) => v.id === payload.id);
    state.followingList.splice(index, 1);
  },
  addFollowerList(state, payload) {
    state.followerList.push(payload);
  },
  removeFollowerList(state, payload) {
    const index = state.followerList.findIndex((v) => v.id === payload.id);
    state.followerList.splice(index, 1);
  },
  loadFollowerList(state) {
    const diff = totalFollowers - state.followerList.length;
    const fakeList = Array(diff > limit ? limit : diff)
      .fill()
      .map(() => ({
        id: Math.random().toString(),
        nickname: Math.floor(Math.random() * 1000),
      }));
    state.followerList = state.followerList.concat(fakeList);
    state.hasMoreFollower = fakeList.length === limit;
  },
  loadFollowingList(state) {
    const diff = totalFollowings - state.followingList.length;
    const fakeList = Array(diff > limit ? limit : diff)
      .fill()
      .map(() => ({
        id: Math.random().toString(),
        nickname: Math.floor(Math.random() * 1000),
      }));
    state.followingList = state.followingList.concat(fakeList);
    state.hasMoreFollowing = fakeList.length === limit;
  },
};

export const actions = {
  singUp({ commit }, payload) {
    this.$axios.post("http://localhost:3085/user", {
      email: payload.email,
      nickname: payload.nickname,
      password: payload.password,
    });

    // 서버에 회원가입 요청을 보내는 부분
    // 가입과 동시에 로그인을 하려고 state.me를 셋팅
    commit("setMe", payload);
  },
  logIn({ commit }, payload) {
    commit("setMe", payload);
  },
  logOut({ commit }) {
    commit("setMe", null);
  },
  changeNickname({ commit }, payload) {
    commit("changeNickname", payload);
  },
  addFollowingList({ commit }, payload) {
    commit("addFollowingList", payload);
  },
  removeFollowingList({ commit }, payload) {
    commit("removeFollowingList", payload);
  },
  addFollowerList({ commit }, payload) {
    commit("addFollowerList", payload);
  },
  removeFollowerList({ commit }, payload) {
    commit("removeFollowerList", payload);
  },
  loadFollowerList({ commit, state }) {
    if (state.hasMoreFollower) {
      commit("loadFollowerList");
    }
  },
  loadFollowingList({ commit, state }) {
    if (state.hasMoreFollowing) {
      commit("loadFollowingList");
    }
  },
};
