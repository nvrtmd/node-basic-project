var express = require("express");
const db = require("../models");
var router = express.Router();

router.get("/login", async (req, res, next) => {
  res.render("member/login", { loginResult: "" });
});

module.exports = router;
