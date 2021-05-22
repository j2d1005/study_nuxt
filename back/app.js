const express = require('express');

const app = express();

app.use(express.json()); // 이걸 추가해줘야 json형식의 데이터가 들어오면 해석해서 req.body에 넣어준다.
app.use(express.urlencoded({ extended: false })); // 폼에서 데이터를 전송할 떄 폼 안의 내용들을 해석해서 req.body에 넣어준다.

app.get('/', (req, res) => {
  res.send('안녕 백엔드');
});

app.post('/user', (req, res) => {
  req.body.email;
  req.body.password;
  req.body.nickname;
});

app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 포트에서 작동 중`);
});