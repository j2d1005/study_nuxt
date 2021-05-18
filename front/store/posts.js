export const state = () => ({
  mainPosts: [],
  hasMorePost: true, // 게시물을 10개 단위로 불러올거고 10개 미만으로 게시물을 받아오게 되면 마지막 페이지이므로 false 로 바꾼다.
});

const totalPosts = 51;
const limit = 10;

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
  },
  removeMainPost(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.id);
    state.mainPosts.splice(index, 1);
  },
  addComment(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.postId);
    state.mainPosts[index].Comments.unshift(payload);
  },
  loadPosts(state, payload) {
    const diff = totalPosts - state.mainPosts.length; // 아직 안 불려온 게시글 수

    // Array(limit).fill()   -- limit만큼 빈 배열을 만든다.
    // const fakePosts = Array(limit)
    const fakePosts = Array(diff > limit ? limit : diff) // 남은 게시글이 10개보다 크면 10개 부르고 아니면 남은 갯수만큼 부른다.
      .fill()
      .map((v) => ({
        id: Math.random().toString(),
        User: {
          id: 1,
          nickname: "HongSam",
        },
        content: `Hello Infinite Scrolling - ${Math.random().toString()}`,
        Comments: [],
        Images: [],
      }));
    state.mainPosts = state.mainPosts.concat(fakePosts);
    state.hasMorePost = fakePosts.length === limit;
  },
};

export const actions = {
  add({ commit }, payload) {
    // 서버에 게시글 등록
    commit("addMainPost", payload);
  },
  remove({ commit }, payload) {
    commit("removeMainPost", payload);
  },
  addComment({ commit }, payload) {
    commit("addComment", payload);
  },
  loadPosts({ commit, state }, payload) {
    if (state.hasMorePost) {
      commit("loadPosts");
    }
  },
};
