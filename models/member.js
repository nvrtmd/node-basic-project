module.exports = (sequelize, DataTypes) => {
  return sequelize.define("member", {
    user_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    user_password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    user_phone: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  });
};
