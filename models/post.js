//게시글 정보 관리 모델 모듈파일 정의
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "post",
    {
      post_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: "게시글 고유번호",
      },
      board_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "게시판 고유번호",
      },
      post_title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: "게시글 제목",
      },
      post_contents: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "게시글 내용",
      },
      post_views: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "게시글 조회수",
      },
      writer_ip_address: {
        type: DataTypes.STRING(15),
        allowNull: true,
        comment: "게시글 작성자/수정자 아이피 주소",
      },
      post_display: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        comment: "게시글 게시 여부 - 1 or 0",
      },
      post_register_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "게시글 등록 일시",
      },
      post_register_user_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: "게시글 작성자 아이디",
      },
      post_modify_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "게시글 수정 일시",
      },
      post_modify_user_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: "수정자아이디",
      },
    },
    {
      timestamps: false,
      paranoid: false,
    }
  );
};
