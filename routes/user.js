const express = require("express");

const router = express.Router();

const passport = require("passport");

const wrapAsync = require("../utils/wrapAsync");

const userController = require("../controllers/users");

// ======================================================
// Signup Routes
// ======================================================

router.get("/signup", userController.renderSignupForm);

router.post("/signup", wrapAsync(userController.signup));

// ======================================================
// Login Routes
// ======================================================

router.get("/login", userController.renderLoginForm);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login,
);

// ======================================================
// Logout Route
// ======================================================

router.get("/logout", userController.logout);

module.exports = router;
