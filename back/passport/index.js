const passport = require('passport');
const local = require('./local');
const db = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    // 사용자 정보를 서버에 저장하는데 서버 메모리 과부화가 되기 때문에 최대한 가볍게 저장을 해야 한다. --> 사용자의 id만 서버에 저장을 한다
    //req.login이 실행될 때 딱 1번 실행된다.
    return done(null, user.id);
  });

  // deserializeUser는 로그인 완료 후에 모든 요청이 올때마다 실행된다.
  // 요청이 올 떄마다 시리얼라이즈 된 유저 정보를 복구해서
  // req.user에 넣어주고 req.isAuthenticated()를 true로 만들어준다.
  // 현재는 요청 1번당 db에 1번씩 접속해서 유저정보를 찾는데
  // 백엔드에서는 db접속을 최소화 하는게 좋기 때문에 나중에는 캐싱 처리를 해줘야한다.
  passport.deserializeUser(async (id, done) => {
    try{
      const user = await db.User.findOne({ where: { id } });
      return done(null, user);
    } catch (err) {
      console.log(err);
      return done(err);
    }
  });

  local();
};