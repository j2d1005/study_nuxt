const passport = require('passport');

module.exports = () => {
  passport.serializeUser((user, done) => {
    // 사용자 정보를 서버에 저장하는데 서버 메모리 과부화가 되기 때문에 최대한 가볍게 저장을 해야 한다. --> 사용자의 id만 서버에 저장을 한다
    //req.login이 실행될 때 딱 1번 실행된다.
    return done(null, user.id);
  });
  passport.deserializeUser(() => {});
};