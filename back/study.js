const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('안녕 백엔드');
  // res.status(200).send('안녕 백엔드');
  // status(200)이 숨어있는 것
  // send 는 리스폰스의 body에 해당된다.
});

app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 포트에서 작동 중`);
});

// http의 기본 포트는 80
// https의 기본 포트는 443