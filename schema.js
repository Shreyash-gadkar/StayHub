const Joi = require("joi");

// ======================================================
// Listing Validation Schema
// ======================================================

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().trim().min(3).max(100).required(),

    description: Joi.string().trim().min(10).max(2000).required(),

    location: Joi.string().trim().min(2).max(200).required(),

    country: Joi.string().trim().min(2).max(100).required(),

    price: Joi.number().min(0).required(),

    image: Joi.string().allow("", null),
  }).required(),
});

// ======================================================
// Review Validation Schema
// ======================================================

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().integer().min(1).max(5).required(),

    comment: Joi.string().trim().min(3).max(1000).required(),
  }).required(),
});

// ======================================================
// Booking Validation Schema
// ======================================================

module.exports.bookingSchema = Joi.object({
  booking: Joi.object({
    checkIn: Joi.date().iso().required(),

    checkOut: Joi.date().iso().greater(Joi.ref("checkIn")).required(),

    guests: Joi.number().integer().min(1).max(20).required(),
  }).required(),
});
