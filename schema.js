const Joi = require("joi");

// ==========================
// Listing Validation Schema
// ==========================
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().trim().required(),

    description: Joi.string().trim().required(),

    location: Joi.string().trim().required(),

    country: Joi.string().trim().required(),

    price: Joi.number().min(0).required(),

    image: Joi.string().allow("", null),
  }).required(),
});

// ==========================
// Review Validation Schema
// ==========================
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),

    comment: Joi.string().trim().required(),
  }).required(),
});
