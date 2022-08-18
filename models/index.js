const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";

// db 연결 환경 설정 정보
const config = require(path.join(__dirname, "..", "config", "config.js"))[env];

// db 객체 생성
const db = {};

// db 연결 정보로 시퀄라이즈 ORM 객체 생성
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 게시글 모델 모듈 파일 참조 및 db 속성 정의
db.Post = require("./post.js")(sequelize, Sequelize);

// 회원 정보 모델 모듈 파일 참조 및 db 속성 정의
db.Member = require("./member.js")(sequelize, Sequelize);

module.exports = db;
