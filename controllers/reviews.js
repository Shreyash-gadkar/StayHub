const Listing = require("../models/Listing");
const Review = require("../models/review");

// ======================================================
// Create Review - EJS
// ======================================================

module.exports.createReview = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  const review = new Review(req.body.review);

  review.author = req.user._id;

  listing.reviews.push(review);

  await review.save();
  await listing.save();

  req.flash("success", "Review Added Successfully!");

  res.redirect(`/listings/${id}`);
};

// ======================================================
// Create Review - React API
// ======================================================

module.exports.createReviewApi = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    return res.status(404).json({
      message: "Listing not found!",
    });
  }

  const review = new Review(req.body.review);

  review.author = req.user._id;

  listing.reviews.push(review);

  await review.save();
  await listing.save();

  await review.populate("author", "username email");

  res.status(201).json({
    message: "Review added successfully",
    review,
  });
};

// ======================================================
// Delete Review - EJS
// ======================================================

module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, {
    $pull: {
      reviews: reviewId,
    },
  });

  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted Successfully!");

  res.redirect(`/listings/${id}`);
};

// ======================================================
// Delete Review - React API
// ======================================================

module.exports.destroyReviewApi = async (req, res) => {
  const { id, reviewId } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    return res.status(404).json({
      message: "Listing not found!",
    });
  }

  await Listing.findByIdAndUpdate(id, {
    $pull: {
      reviews: reviewId,
    },
  });

  await Review.findByIdAndDelete(reviewId);

  res.status(200).json({
    message: "Review deleted successfully",
  });
};
