export default function ({ store, redirect }) {
  // 로그인하지 않은 사용자를 "/"로 리다이렉트
  if (store.state.users.me) {
    redirect("/");
  }
}
