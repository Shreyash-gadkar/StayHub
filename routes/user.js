const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user");

// ===============================
// Login
// ===============================

// Show Login Form
router.get("/login", (req, res) => {
  res.render("users/login");
});

// Handle Login
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome back to StayHub!");
    res.redirect("/listings");
  },
);

// ===============================
// Signup
// ===============================

// Show Signup Form
router.get("/signup", (req, res) => {
  res.render("users/signup");
});

// Handle Signup
router.post("/signup", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const newUser = new User({ username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }

      req.flash("success", "Welcome to StayHub!");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
});

// ===============================
// Logout
// ===============================

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.flash("success", "Logged out successfully!");
    res.redirect("/listings");
  });
});

module.exports = router;
