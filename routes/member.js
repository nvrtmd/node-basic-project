var express = require("express");
const db = require("../models");
var router = express.Router();

router.get("/signUp", async (req, res, next) => {
  res.render("member/signUp");
});

router.get("/signIn", async (req, res, next) => {
  res.render("member/signIn", { signInResult: "" });
});

module.exports = router;
