var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var expressLayouts = require("express-ejs-layouts");
var sequelize = require("./models/index.js").sequelize;
var session = require("express-session");
var passport = require("passport");
var flash = require("connect-flash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var boardRouter = require("./routes/board");
var memberRouter = require("./routes/member");

var app = express();

app.use(flash());

sequelize.sync();

const passportConfig = require("./passport/index.js");

passportConfig(passport);

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "testSession",
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 5,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layout");
app.set("layout extractScripts", true);

app.use(expressLayouts);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/board", boardRouter);
app.use("/member", memberRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
