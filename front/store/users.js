export const state = () => ({
  me: null, // me에 객체가 들어오면 로그인이 된 상태
});

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
};

export const actions = {
  singUp({ commit }, payload) {
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
};
