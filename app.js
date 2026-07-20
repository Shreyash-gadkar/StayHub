const express = require("express");
const app = express();

const engine = require("ejs-mate");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");

const Listing = require("./models/Listing");
const listingRouter = require("./routes/listing");

// ===============================
// Database Connection
// ===============================

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/stayhub");
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

app.set("view engine", "ejs");
app.engine("ejs", engine);

// ===============================
// Middlewares
// ===============================

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Debug Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// ===============================
// Routes
// ===============================

// Home Route
app.get("/", (req, res) => {
  res.render("home");
});

// Listing Routes (Index route is handled in MVC)
app.use("/listings", listingRouter);

// ===============================
// Server
// ===============================

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
