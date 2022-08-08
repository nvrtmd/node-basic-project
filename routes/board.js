var express = require("express");
const db = require("../models");
var router = express.Router();
var moment = require("moment");

router.get("/list", async (req, res) => {
  const postList = await db.Post.findAll();
  res.render("board/list", {
    postList: postList.filter((post) => post.post_display),
    moment,
  });
});

router.get("/create", async (req, res) => {
  res.render("board/create");
});

router.post("/create", async (req, res) => {
  const postData = {
    board_id: 1,
    post_title: req.body.postTitle,
    post_contents: req.body.postContents,
    post_views: 0,
    writer_ip_address: req.ip,
    post_display: JSON.parse(req.body.postDisplay),
    post_register_date: Date.now(),
    post_register_user_name: "anonymous",
  };

  const registerPostData = await db.Post.create(postData);

  res.redirect("/board/list");
});

router.get("/modify/:postId", async (req, res) => {
  res.render("board/modify");
});

module.exports = router;
