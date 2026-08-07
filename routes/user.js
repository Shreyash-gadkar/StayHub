const express = require("express");
const router = express.Router();

const passport = require("passport");

const wrapAsync = require("../utils/wrapAsync");
const userController = require("../controllers/users");

// ==========================
// Signup Routes
// ==========================

// Show Signup Form
router.get("/signup", userController.renderSignupForm);

// Handle Signup
router.post("/signup", wrapAsync(userController.signup));

// ==========================
// Login Routes
// ==========================

// Show Login Form
router.get("/login", userController.renderLoginForm);

// Handle Login
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login,
);

// ==========================
// Logout Route
// ==========================

router.get("/logout", userController.logout);

module.exports = router;
