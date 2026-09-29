const express = require("express");

const router = express.Router({
  mergeParams: true,
});

const reviewController = require("../controllers/reviews");

const wrapAsync = require("../utils/wrapAsync");

const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");

// ======================================================
// EJS - Create Review
// ======================================================

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview),
);

// ======================================================
// EJS - Delete Review
// ======================================================

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview),
);

// ======================================================
// React API - Create Review
// ======================================================

router.post(
  "/api",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReviewApi),
);

// ======================================================
// React API - Delete Review
// ======================================================

router.delete(
  "/api/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReviewApi),
);

module.exports = router;
