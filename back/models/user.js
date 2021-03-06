module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(40), // 40자 이내
      allowNull: false, // 필수
      unique: true // 중복금지! models에서 코드로 못잡아내는 경우 db에서도 자동으로 중복을 잡아준다.
      //createdAt, updatedAt, id 는 자동으로 생성해준다.
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장하려면 둘다 넣어야 함.
  });
  User.associate = (db) => {

  };
  return User;
};