var express = require("express");
const db = require("../models");
var router = express.Router();
const bcrypt = require("bcryptjs");

router.get("/signUp", async (req, res, next) => {
  res.render("member/signUp");
});

router.post("/signUp", async (req, res, next) => {
  const encryptedPassword = await bcrypt.hash(req.body.userPassword, 12);
  const memberData = {
    user_id: req.body.userId,
    user_password: encryptedPassword,
    user_name: req.body.userName,
    user_phone: req.body.userPhone,
  };
  await db.Member.create(memberData);
  res.redirect("/board/list");
});

router.get("/signIn", async (req, res, next) => {
  res.render("member/signIn", { signInResult: "" });
});

router.post("/normal-signIn", async (req, res, next) => {
  const userId = req.body.userId;
  const userPassword = req.body.userPassword;
  let signInResult;

  const memberData = await db.Member.findOne({ where: { user_id: userId } });

  if (memberData !== null) {
    const isCorrectPassword = await bcrypt.compare(
      userPassword,
      memberData.user_password
    );

    if (isCorrectPassword) {
      res.redirect("/board/list");
    } else {
      signInResult = "비밀번호가 일치하지 않습니다.";
    }
  } else {
    signInResult = "아이디가 존재하지 않습니다.";
  }
  res.render("member/signIn", { signInResult });
});

module.exports = router;
