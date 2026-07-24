const express = require("express");
const app = express();

const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const listingRouter = require("./routes/listing");
const ExpressError = require("./utils/ExpressError");

// ===============================
// Database Connection
// ===============================

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/stayhub");
}

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// ===============================
// App Configuration
// ===============================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ===============================
// Middlewares
// ===============================

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ===============================
// Routes
// ===============================

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/listings", listingRouter);

// ===============================
// Error Handling
// ===============================

// Handle unknown routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong!" } = err;

  res.status(statusCode).render("error.ejs", {
    err,
  });
});

// ===============================
// Server
// ===============================

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
