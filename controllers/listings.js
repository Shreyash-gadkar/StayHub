const Listing = require("../models/Listing");

// Index Route
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};

// New Route
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

// Show Route
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", { listing });
};

// Create Route
module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();

  req.flash("success", "New listing created successfully!");

  res.redirect("/listings");
};

// Edit Route
module.exports.editListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
};

// Update Route
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndUpdate(id, req.body.listing);

  req.flash("success", "Listing updated successfully!");

  res.redirect(`/listings/${id}`);
};

// Delete Route
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing deleted successfully!");

  res.redirect("/listings");
};
