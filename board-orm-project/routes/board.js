var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/list", async (req, res, next) => {
  res.render("board/list");
});

module.exports = router;
