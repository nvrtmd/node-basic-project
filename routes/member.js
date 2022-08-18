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

module.exports = router;
