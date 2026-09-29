const Listing = require("./models/Listing");
const Review = require("./models/review");
const Booking = require("./models/Booking");

const { listingSchema, reviewSchema, bookingSchema } = require("./schema");

const ExpressError = require("./utils/ExpressError");

// ======================================================
// Validate Listing
// ======================================================

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");

    throw new ExpressError(400, errMsg);
  }

  next();
};

// ======================================================
// Validate Review
// ======================================================

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");

    throw new ExpressError(400, errMsg);
  }

  next();
};

// ======================================================
// Validate Booking
// ======================================================

module.exports.validateBooking = (req, res, next) => {
  const { error } = bookingSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");

    return res.status(400).json({
      message: errMsg,
    });
  }

  next();
};

// ======================================================
// Check Login
// ======================================================

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    if (
      req.originalUrl.startsWith("/api/") ||
      req.originalUrl.startsWith("/listings/api")
    ) {
      return res.status(401).json({
        message: "You must be logged in first!",
      });
    }

    req.session.redirectUrl = req.originalUrl;

    req.flash("error", "You must be logged in first!");

    return res.redirect("/login");
  }

  next();
};

// ======================================================
// Check Listing Owner
// ======================================================

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    if (
      req.originalUrl.startsWith("/api/") ||
      req.originalUrl.startsWith("/listings/api")
    ) {
      return res.status(404).json({
        message: "Listing not found!",
      });
    }

    req.flash("error", "Listing not found!");

    return res.redirect("/listings");
  }

  if (!listing.owner.equals(req.user._id)) {
    if (
      req.originalUrl.startsWith("/api/") ||
      req.originalUrl.startsWith("/listings/api")
    ) {
      return res.status(403).json({
        message: "You don't have permission to do that!",
      });
    }

    req.flash("error", "You don't have permission to do that!");

    return res.redirect(`/listings/${id}`);
  }

  next();
};

// ======================================================
// Check Review Author
// ======================================================

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    if (req.originalUrl.startsWith("/api/")) {
      return res.status(404).json({
        message: "Review not found!",
      });
    }

    req.flash("error", "Review not found!");

    return res.redirect(`/listings/${id}`);
  }

  if (!review.author.equals(req.user._id)) {
    if (req.originalUrl.startsWith("/api/")) {
      return res.status(403).json({
        message: "You are not the author of this review!",
      });
    }

    req.flash("error", "You are not the author of this review!");

    return res.redirect(`/listings/${id}`);
  }

  next();
};

// ======================================================
// Check Booking Owner
// ======================================================

module.exports.isBookingOwner = async (req, res, next) => {
  const { id } = req.params;

  const booking = await Booking.findById(id);

  if (!booking) {
    return res.status(404).json({
      message: "Booking not found!",
    });
  }

  if (!booking.user.equals(req.user._id)) {
    return res.status(403).json({
      message: "You are not authorized to access this booking!",
    });
  }

  req.booking = booking;

  next();
};
