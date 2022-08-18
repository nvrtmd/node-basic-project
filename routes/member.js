var express = require("express");
const db = require("../models");
var router = express.Router();

router.get("/signIn", async (req, res, next) => {
  res.render("member/signIn", { loginResult: "" });
});

module.exports = router;
