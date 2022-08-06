var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/list", async (req, res) => {
  res.render("board/list");
});

router.get("/create", async (req, res) => {
  res.render("board/create");
});

router.post("/create", async (req, res) => {});

module.exports = router;
