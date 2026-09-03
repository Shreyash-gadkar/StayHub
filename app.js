if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const app = express();

const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");

const User = require("./models/user");

const userRouter = require("./routes/user");
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");

const ExpressError = require("./utils/ExpressError");

// ===============================
// Database Connection
// ===============================

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
}

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// ===============================
// App Configuration
// ===============================

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ===============================
// Middlewares
// ===============================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ===============================
// Session Configuration
// ===============================

const sessionOptions = {
  secret: process.env.SECRET || "mysupersecretcode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// ===============================
// Passport Configuration
// ===============================

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===============================
// Global Variables
// ===============================

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// ===============================
// Routes
// ===============================

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/", userRouter);
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);

// ===============================
// Error Handling
// ===============================

// Handle Unknown Routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;

  res.status(statusCode).render("error", { err });
});

// ===============================
// Server
// ===============================

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
