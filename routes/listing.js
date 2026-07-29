const express = require("express");
const router = express.Router();

const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

const listingController = require("../controllers/listings");

// Index
router.get("/", wrapAsync(listingController.index));

// New
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

// Create
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.createListing),
);

// Edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing),
);

// Show
router.get("/:id", wrapAsync(listingController.showListing));

// Update
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing),
);

// Delete
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing),
);

module.exports = router;
