const express = require("express");
const router = express.Router();

const listingController = require("../controllers/listings");

// Index Route
router.get("/", listingController.index);

// New Route
router.get("/new", listingController.renderNewForm);

// Show Route
router.get("/:id", listingController.showListing);

// Create Route
router.post("/", listingController.createListing);

// Edit Route
router.get("/:id/edit", listingController.renderEditForm);

// Update Route
router.put("/:id", listingController.updateListing);

// Delete Route
router.delete("/:id", listingController.deleteListing);

module.exports = router;
