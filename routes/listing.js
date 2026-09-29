const express = require("express");

const router = express.Router();

const multer = require("multer");

const { storage } = require("../cloudConfig");

const upload = multer({ storage });

const { isLoggedIn, isOwner, validateListing } = require("../middleware");

const wrapAsync = require("../utils/wrapAsync");

const listingController = require("../controllers/listings");

// Review Router
const reviewRouter = require("./review");

// ======================================================
// Index Routes
// ======================================================

// EJS
router.get("/", wrapAsync(listingController.index));

// React API
router.get("/api", wrapAsync(listingController.apiIndex));

// ======================================================
// New Listing
// ======================================================

router.get("/new", isLoggedIn, listingController.renderNewForm);

// ======================================================
// Create Listing
// ======================================================

// React API
router.post(
  "/api",
  isLoggedIn,
  upload.single("image"),
  validateListing,
  wrapAsync(listingController.createListingApi),
);

// EJS
router.post(
  "/",
  isLoggedIn,
  upload.single("image"),
  validateListing,
  wrapAsync(listingController.createListing),
);

// ======================================================
// Show Listing
// ======================================================

// React API
router.get("/api/:id", wrapAsync(listingController.showListingApi));

// EJS
router.get("/:id", wrapAsync(listingController.showListing));

// ======================================================
// Edit Listing
// ======================================================

// React API
router.put(
  "/api/:id",
  isLoggedIn,
  isOwner,
  upload.single("image"),
  validateListing,
  wrapAsync(listingController.updateListingApi),
);

// EJS
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing),
);

// ======================================================
// Update Listing
// ======================================================

router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing),
);

// ======================================================
// Delete Listing
// ======================================================

// React API
router.delete(
  "/api/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListingApi),
);

// EJS
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing),
);

// ======================================================
// React API - Reviews
// ======================================================

router.use("/api/:id/reviews", reviewRouter);

// ======================================================
// Export Router
// ======================================================

module.exports = router;
