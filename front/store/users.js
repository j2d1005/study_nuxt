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
    this.$axios
      .post("http://localhost:3085/user", {
        email: payload.email,
        nickname: payload.nickname,
        password: payload.password,
      })
      .then((res) => {
        // 서버에 회원가입 요청을 보내는 부분
        // 가입과 동시에 로그인을 하려고 state.me를 셋팅
        console.log(res.data);
        commit("setMe", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  logIn({ commit }, payload) {
    this.$axios
      .post(
        "http://localhost:3085/user/login",
        {
          email: payload.email,
          password: payload.password,
        },
        {
          withCredentials: true,
          // 도메인이 달라서 httponly때문에 쿠기 저장이 안될 때 설정
          // 백엔드에서도 session 미들웨어에서 cookie옵션 설정해야 하
          // cors 미들웨어에서도 Credentials 설정을 해야함
        }
      )
      .then((res) => {
        console.log(res.data);
        commit("setMe", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
