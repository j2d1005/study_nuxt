const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const db = require('./models')
const app = express();

db.sequelize.sync(); // 서버를 켜면 db sequelize 도 같이 켜짐

app.use(cors("http://localhost:3000")); // (괄호 비워두면 모든 요청 허용. *절대 금지*)
app.use(express.json()); // 이걸 추가해줘야 json형식의 데이터가 들어오면 해석해서 req.body에 넣어준다.
app.use(express.urlencoded({ extended: false })); // 폼에서 데이터를 전송할 떄 폼 안의 내용들을 해석해서 req.body에 넣어준다.

app.get('/', (req, res) => {
  res.send('안녕 백엔드');
});

app.post('/user', async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 12); // 숫자를 높일 수록 암호화 단계가 올라가지만 느려진다.
    const newUser = await db.User.create({
      email: req.body.email,
      password: hash,
      nickname: req.body.nickname,
    });
    // 요청을 받고
    // status 200 = 성공 / 201 = 성공적으로 생성됨
    res.status(201).json(newUser); // 응답을 보낸다.
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 포트에서 작동 중`);
});