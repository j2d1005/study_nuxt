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




// sequelize, mysql2 설치
// sequelize를 사용해서 DB(mysql, msql, mariaDB 등 )종류에 상관없이 자바스크립트로 표현이 가능하다 ?
// mysql2는 DB설치랑은 다르다. node와 mysql을 연결해주는 드라이버 역할

// sequelize-cli 를 -D로 설치 후 npx sequelize init 명령어를 실행하면
// config, migrations, models, seeders 폴더가 셋팅됨


// nodemon 설치후 npm script를 node => nodemon으로 바꿔준다.
// 그러면 서버를 껏다 켜지 않아도 새로고침하면 수정사항이 반영된다.