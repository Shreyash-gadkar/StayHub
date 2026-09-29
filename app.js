// ======================================================
// Environment Configuration
// ======================================================

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// ======================================================
// Dependencies
// ======================================================

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");

// ======================================================
// Models
// ======================================================

const User = require("./models/user");

// ======================================================
// Routes
// ======================================================

const userRouter = require("./routes/user");
const authApiRouter = require("./routes/authApi");
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const bookingRouter = require("./routes/booking");

// ======================================================
// Utilities
// ======================================================

const ExpressError = require("./utils/ExpressError");

// ======================================================
// App Initialization
// ======================================================

const app = express();

// ======================================================
// Database Connection
// ======================================================

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
  console.log("Connected to MongoDB Atlas");
}

main().catch((err) => {
  console.error("Database connection failed:", err);
});

// ======================================================
// View Engine Configuration
// ======================================================

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

// ======================================================
// CORS Configuration
// ======================================================

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
  }),
);

// ======================================================
// Body Parsers
// ======================================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// ======================================================
// Method Override
// ======================================================

app.use(methodOverride("_method"));

// ======================================================
// Static Files
// ======================================================

app.use(express.static(path.join(__dirname, "public")));

// ======================================================
// Session Configuration
// ======================================================

const isProduction = process.env.NODE_ENV === "production";

app.set("trust proxy", 1);

const sessionOptions = {
  secret: process.env.SECRET || "mysupersecretcode",

  resave: false,

  saveUninitialized: false,

  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  },
};

app.use(session(sessionOptions));

app.use(session(sessionOptions));

// ======================================================
// Flash Messages
// ======================================================

app.use(flash());

// ======================================================
// Passport Configuration
// ======================================================

app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

// ======================================================
// Global Variables
// ======================================================

app.use((req, res, next) => {
  res.locals.success = req.flash("success");

  res.locals.error = req.flash("error");

  res.locals.currUser = req.user;

  next();
});

// ======================================================
// Health Check
// ======================================================

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "StayHub backend is running",
  });
});

// ======================================================
// Home Route
// ======================================================

app.get("/", (req, res) => {
  res.render("home");
});

// ======================================================
// Routes
// ======================================================

// Existing EJS authentication
app.use("/", userRouter);

// React authentication API
app.use("/api/auth", authApiRouter);

// Listings
app.use("/listings", listingRouter);

// Reviews
app.use("/listings/:id/reviews", reviewRouter);

// Bookings
app.use("/api/bookings", bookingRouter);

// ======================================================
// API 404 Handler
// ======================================================

app.use("/api", (req, res) => {
  res.status(404).json({
    message: "API route not found",
  });
});

// ======================================================
// General 404 Handler
// ======================================================

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// ======================================================
// Global Error Handler
// ======================================================

app.use((err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  if (
    req.originalUrl.startsWith("/api") ||
    req.originalUrl.startsWith("/listings/api")
  ) {
    return res.status(statusCode).json({
      message: err.message || "Internal Server Error",
    });
  }

  res.status(statusCode).render("error", {
    err,
  });
});

// ======================================================
// Server
// ======================================================

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`StayHub server running on port ${PORT}`);

  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
