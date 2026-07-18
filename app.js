const express = require("express");
const engine = require("ejs-mate");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");

const Listing = require("./models/Listing");

const app = express();

// ===============================
// Database Connection
// ===============================

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/stayhub");
}

main()
  .then(async () => {
    console.log("Connected to DB");

    const allListings = await Listing.find();
    console.log(allListings);
  })
  .catch((err) => console.log(err));

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

// Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
});

// New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Create Route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body);

  await newListing.save();

  res.redirect("/listings");
});

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  res.render("listings/edit.ejs", { listing });
});

// Update Route
app.put("/listings/:id", async (req, res) => {
  console.log("PUT Route Reached");

  const { id } = req.params;

  await Listing.findByIdAndUpdate(id, req.body);

  res.redirect(`/listings/${id}`);
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});
// Show Route
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  res.render("listings/show.ejs", { listing });
});

// ===============================
// Server
// ===============================

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
