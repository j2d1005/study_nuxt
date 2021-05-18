// {commit} 부분은 context이다. 구조분해 할당으로 꺼낸것  -- vuex의 context랑 같은가...??
export default function ({ store, redirect }) {
  // 로그인을 한 사용자라면 "/"로 리다이렉트
  if (!store.state.users.me) {
    redirect("/");
  }
}
