const User = require("../models/user");

// ======================================================
// Signup - EJS
// ======================================================

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup");
};

module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
    });

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
};

// ======================================================
// Login - EJS
// ======================================================

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to StayHub!");

  const redirectUrl = res.locals.redirectUrl || "/listings";

  res.redirect(redirectUrl);
};

// ======================================================
// Logout - EJS
// ======================================================

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.flash("success", "Logged out successfully!");

    res.redirect("/listings");
  });
};
