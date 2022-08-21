var express = require("express");
const db = require("../models");
var router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { isSignedIn, isNotSignedIn } = require("./middlewares");
const jwt = require("jsonwebtoken");

router.get("/signUp", isNotSignedIn, async (req, res, next) => {
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

router.get("/signIn", isNotSignedIn, async (req, res, next) => {
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
      req.session.isSignIn = true;
      req.session.signInUser = {
        userSeq: memberData.id,
        userId: memberData.user_id,
        userName: memberData.user_name,
        userPhone: memberData.user_phone,
      };
      req.session.save(() => {
        res.redirect("/board/list");
      });
    } else {
      signInResult = "비밀번호가 일치하지 않습니다.";
      res.render("member/signIn", { signInResult });
    }
  } else {
    signInResult = "아이디가 존재하지 않습니다.";
    res.render("member/signIn", { signInResult });
  }
});

router.post("/passport-signIn", async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }

    if (!user) {
      req.flash("loginError", info.message);
      return res.redirect("/member/signIn");
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/board/list");
    });
  })(req, res, next);
});

router.get("/profile", isSignedIn, async (req, res, next) => {
  const memberData = req.session.passport.user;
  res.render("member/profile", { memberData });
});

router.get("/jwtGenerator", async (req, res, next) => {
  res.render("member/jwtGenerator");
});

router.post("/jwtGenerator", async (req, res, next) => {
  const userId = req.body.userId;
  const userName = req.body.userName;
  const userPhone = req.body.userPhone;

  const memberData = {
    userId,
    userName,
    userPhone,
  };

  const token = jwt.sign(memberData, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
    issuer: "YUZAMIN",
  });

  const result = {
    token,
  };

  res.json(result);
});

module.exports = router;
