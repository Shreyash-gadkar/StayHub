const express = require("express");
const router = express.Router();

const { validateListing } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

const listingController = require("../controllers/listings");

// Index
router.get("/", wrapAsync(listingController.index));

// New
router.get("/new", listingController.renderNewForm);

// Create
router.post("/", validateListing, wrapAsync(listingController.createListing));

// Edit
router.get("/:id/edit", wrapAsync(listingController.editListing));

// Show
router.get("/:id", wrapAsync(listingController.showListing));

// Update
router.put("/:id", validateListing, wrapAsync(listingController.updateListing));

// Delete
router.delete("/:id", wrapAsync(listingController.deleteListing));

module.exports = router;
