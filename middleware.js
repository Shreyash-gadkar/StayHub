const Listing = require("./models/Listing");
const { listingSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }

  next();
};

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  next();
};
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing.owner.equals(req.user._id)) {
    return res.redirect(`/listings/${id}`);
  }

  next();
};
