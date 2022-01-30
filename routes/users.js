const express = require("express");
const user = require("../models/user");
const User = require("../models/user");

const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ username: req.body.username });
  } catch (err) {
    next(err);
  }
  if (user) {
    const err = new Error(`User ${req.body.username} already exists!`);
    err.status = 403;
    return next(err);
  } else {
    try {
      const userDoc = await User.create({
        username: req.body.username,
        password: req.body.password,
      });
      res.status = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ status: "Registration successful!", user: userDoc });
    } catch (err) {
      next(err);
    }
  }
});

router.post("/login", async (req, res, next) => {
  if (!req.session.user) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      const err = new Error("You are not authenticated");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      return next(err);
    }

    const auth = Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");

    const [username, password] = auth;
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        const err = new Error(`User ${username} does not exist`);
        err.status = 401;
        return next(err);
      } else if (user.password !== password) {
        const err = new Error(`Your password is incorrect!`);
        err.status = 401;
        return next(err);
      } else if (user.username === username && user.password === password) {
        req.session.user = "authenticated";
        res.status = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("You are authenticated!");
      }
    } catch (err) {
      return next(err);
    }
  } else {
    res.status = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("You are already authenticated!");
  }
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    const err = new Error("You are not logged in!");
    return next(err);
  }
});

module.exports = router;
