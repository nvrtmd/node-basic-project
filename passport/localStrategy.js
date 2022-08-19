const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { Member } = require("../models");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userId",
        passwordField: "userPassword",
      },
      async (userId, userPassword, done) => {
        try {
          const memberData = await Member.findOne({
            where: { user_id: userId },
          });
          if (memberData) {
            const isCorrectPassword = await bcrypt.compare(
              userPassword,
              memberData.user_password
            );
            if (isCorrectPassword) {
              const signInUser = {
                userSeq: memberData.id,
                userId: memberData.user_id,
                userName: memberData.user_name,
                userPhone: memberData.user_phone,
              };
              done(null, signInUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "아이디가 존재하지 않습니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
