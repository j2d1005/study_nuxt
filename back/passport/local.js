// passport 전략.
// sns로그인 등 여러가지 로그인 방법이 있는데 그걸 전략이라는 틀로 passport에서 하나로 통일시켜준다. 어떤 로그인 방식을 거치든 이 틀을 통한다.
const passport = require('passport');
const db = require('../models');
const bcrypt = require('bcrypt');
const { Strategy: LocalStrategy } = require('passport-local');

module.exports = () => {
  passport.use(new LocalStrategy({
    // 요기안에서 email과 password검사가 진행됨
    usernameField: 'email', // req.body.email 이라서 'email'
    passwordField: 'password', // req.body.password
  }, async (email, password, done) => {
    try {
      const exUser = await db.User.findOne({ where: { email } }); //db에 해당 이메일이 있는지 검사

      if (!exUser) {
        // 이메일이 없다. 비밀번호 검사를 할 필요X
        return done(null, false, { reason: '존재하지 않는 사용자입니다.' })
        // done()매개변수 // done(에러, 성공, 실패); 각각에 해당하는 자리에 내용 넣어주면 됨
      }

      const result = await bcrypt.compare(password, exUser.password); // compare함수로 두 인자가 같은지 비교하는것, 같으면 true

      if (result) {
        // 비밀번호도 일치 할 때
        return done(null, exUser);
      } else {
        // 비밀번호가 틀렸을 때
        return done(null, false, { reason: '비밀번호가 틀립니다.' });
      }
    } catch (err) {
      console.log(err);
      return done(err);
    }
  }));
};

// passport 전략 기본 템플릿 이건 그냥 따라치면 됨
// module.exports = () => {
//   passport.use(new LocalStrategy({
//
//   }, async (email, password, done) => {
//
//   }));
// };