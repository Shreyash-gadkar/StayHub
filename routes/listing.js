const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

const { isLoggedIn, isOwner, validateListing } = require("../middleware");

const wrapAsync = require("../utils/wrapAsync");
const listingController = require("../controllers/listings");

// ==========================
// Index Route
// ==========================
router.get("/", wrapAsync(listingController.index));

// ==========================
// New Route
// ==========================
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ==========================
// Create Route
// ==========================
router.post(
  "/",
  isLoggedIn,
  upload.single("image"),
  validateListing,
  wrapAsync(listingController.createListing),
);

// ==========================
// Show Route
// ==========================
router.get("/:id", wrapAsync(listingController.showListing));

// ==========================
// Edit Route
// ==========================
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing),
);

// ==========================
// Update Route
// ==========================
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing),
);

// ==========================
// Delete Route
// ==========================
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing),
);

module.exports = router;
