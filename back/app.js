const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const db = require('./models');
const passportConfig = require('./passport');
const app = express();

// db.sequelize.sync({ force: true }); // force:true 속성을 주면 서버 꺼졌다 켜질 때마다 테이블데이터를 다 지우고 새로 생성한다. 실무에서는 X
// 실무에서는 마이그레이션이라는 걸 사용해야한다.
db.sequelize.sync(); // 서버를 켜면 db sequelize 도 같이 켜짐
passportConfig();

// app.use에 들어가는 것은 미들웨어이고 미들웨어들은 요청과 응답에 관여한다.
app.use(morgan('dev')); // 제일 위에 선언해줘야함. 콘솔에 요청에 대해 기록해주는 역할
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
})); // (괄호 비워두면 모든 요청 허용. *절대 금지*)
app.use(express.json()); // 이걸 추가해줘야 json형식의 데이터가 들어오면 해석해서 req.body에 넣어준다.
app.use(express.urlencoded({ extended: false })); // 폼에서 데이터를 전송할 떄 폼 안의 내용들을 해석해서 req.body에 넣어준다.
app.use(cookie('cookieSecret')); // session설치하면서 cookie를 해석해주는 cooke-parser도 설치해줘야 한다.
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'cookieSecret', // 쿠키 암호화를 해제할 수 있는 키. 필수값
  cookie: {
    httpOnly: true,
    secure: false,
  },
})); // passport.session() 을 사용하려면 express-session을 설치하고 먼저 선언해줘야 한다.
app.use(passport.initialize()); // 요청에 로그인, 로그아웃 기능을 만들어준다.
app.use(passport.session()); // 메모리의 개념 / 사용자의 정보를 기록할 수 있는 세션을 만들어줌


app.get('/', (req, res) => {
  res.send('안녕 백엔드');
});

// 회원가입
app.post('/user', async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 12); // 숫자를 높일 수록 암호화 단계가 올라가지만 느려진다.
    const exUser = await db.User.findOne({
      // db.User에 req.body.email과 같은 email이 있으면 exUser에 담긴다.
      where: { // db찾을 때 조건은 where안에다가 넣어줘야 함
        email: req.body.email,
      }
    });

    // 이미 회원가입이 되어 있는 경우!
    if (exUser) {
      // 응답을 보내는 경우 반드시 return으로 함수를 끝내야 함. 응담이 두번가는경우 치명적 에러가 생김
      return res.state(403).json({
        errorCode: 1, // 마음대로 정해도 됨, 프론트와 백 협업중 결정하면 됨
        message: '이미 회원가입 되어있습니다.',
      });
      // status 400 잘못된 요청 / 401 권한문제 / 403 금지  / 404 not found
      //상황에 맞게 선택하여 사용 / 애매하면 400, 401, 403 중에 선택한대
    }

    await db.User.create({
      email: req.body.email,
      password: hash,
      nickname: req.body.nickname,
    });
    // db에 회원가입 요청온 데이터를 담고 바로 login 실행
    passport.authenticate('local', (err, user, info) => {
      if (err) { // 에러
        console.log(err);
        return next(err);
      }
      if (info) { // 실패
        return res.status(401).send(info.reason);
      }

      // 성공 시
      return req.login(user, async (err) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        return res.json(user);
      });
    })(req, res, next);
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

// 로그인
app.post('/user/login', async (req, res, next) => {
  // 로그인 - 사용자가 email, password로 로그인을 시도하고 db에서 매칭이 되면 백에서 프론트로 cookie에 로그인한 사용자의 쿠키와 정보를 담아서 보내준다. 그럼 프론트에서 로그인 후에 항상 쿠키를 들고 있을 것이고 앞으로 모든 요청에 해당 쿠키를 같이 백에다가 보내면 백에서는 그 쿠키를 기반으로 현재 로그인한 유저가 누군지 판별이 가능하다.
  // 로그인 과정 - email, password의 검증. db.User.fineOne(~~). 검증 통과하면 session에다가 쿠키와 유저 정보를 저장하고 프론트에 쿠키를 내려보내준다.
  // 이것들을 해주는 것이 passport

  // 'local'을 넣어주면 localStrategy가 실행됨.
  // 설정한 passport/local.js의 localStrategy 를 직접 실행시켜주어야 한다.
  passport.authenticate('local', (err, user, info) => {
    // err, user, info는 localStrategy 의 done함수의 매개변수의 값.(에러, 성공, 실패)
    if (err) { // 에러
      console.log(err);
      return next(err);
    }
    if (info) { // 실패
      return res.status(401).send(info.reason);
    }

    // 성공 시
    // req.login 은 미들웨어 passport.initialize()에서 넣어준 것이다.
    return req.login(user, async (err) => {
      // --> 세션에 사용자 정보를 저장
      // 쿠키도 프론트에 req.login이 자동으로 내려주기 때문에 따로 처리할 필요 없다.
      if (err) {
        console.log(err);
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);

  // passport를 사용한 로그인 과정 정리
  // 1. 프론트에서 '/user/login' 에 이메일과 비밀번호를 담아서 post 요청
  // 2. app.use(express.json());
  //    app.use(express.urlencoded({ extended: false }));
  //    로 인해서 json, formdata가 해석이 되어 req.body에 이메일과 패스워드가 담긴다.
  // 3. passport.authenticate('local',) 함수로 req.body내용을 passport/local.js의 LocalStrategy에 보낸다.
  // 4. passport/local.js에서 셋팅한 LocalStrategy에서 로그인 검증을 진행한다.
  // 5. 성공하면 passport.authenticate('local', () => {})의 콜백함수 부분으로 돌아온다.
  // 6. 에러, 실패가 아니라면 app.use(passport.initialize());로 생성된 req.login이 실행된다.
  // 7. req.login이 세션에 사용자 정보를 저장하고 프론트에 쿠키를 내려준다. 쿠키는 헤더에 포함되어 있다. passport/index.js의 passport.serializeUser도 실행된다.
  // 8. 바디에 사용자 정보를 같이 보내준다.
});

// 로그인 후 동작 예제
app.post('/asdf', (req, res) => {
  if (req.isAuthenticated()) {
    // 로그인 후에는 항상 매 요청마다 passport/index.js의 디시리얼라이즈가 실행되어서 로그인이 완료되어 있으면 req.isAuthenticated()가 true가 된다. 이걸로 로그인 여부를 판별한다.
  }
});


app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 포트에서 작동 중`);
});