const Listing = require("../models/Listing");
const { cloudinary } = require("../cloudConfig");
const geocoder = require("../utils/geocoder");

// ======================================================
// Index - EJS
// ======================================================

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});

  res.render("listings/index", {
    allListings,
  });
};

// ======================================================
// Index - React API
// ======================================================

module.exports.apiIndex = async (req, res) => {
  const allListings = await Listing.find({})
    .populate("owner", "username email")
    .populate({
      path: "reviews",
      populate: {
        path: "author",
        select: "username",
      },
    });

  res.status(200).json(allListings);
};

// ======================================================
// New Listing - EJS
// ======================================================

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

// ======================================================
// Show Listing - EJS
// ======================================================

module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");

    return res.redirect("/listings");
  }

  res.render("listings/show", {
    listing,
  });
};

// ======================================================
// Show Listing - React API
// ======================================================

module.exports.showListingApi = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
        select: "username",
      },
    })
    .populate("owner", "username email");

  if (!listing) {
    return res.status(404).json({
      message: "Listing not found",
    });
  }

  res.status(200).json(listing);
};

// ======================================================
// Create Listing - EJS
// ======================================================

module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);

  newListing.owner = req.user._id;

  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  const geoData = await geocoder.geocode(req.body.listing.location);

  if (!geoData.length) {
    return res.status(400).json({
      message: "Unable to find the specified location",
    });
  }

  newListing.geometry = {
    type: "Point",
    coordinates: [geoData[0].longitude, geoData[0].latitude],
  };

  await newListing.save();

  req.flash("success", "New Listing Created Successfully!");

  res.redirect("/listings");
};

// ======================================================
// Create Listing - React API
// ======================================================

module.exports.createListingApi = async (req, res) => {
  const newListing = new Listing(req.body.listing);

  newListing.owner = req.user._id;

  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  const geoData = await geocoder.geocode(req.body.listing.location);

  if (!geoData.length) {
    return res.status(400).json({
      message: "Unable to find the specified location",
    });
  }

  newListing.geometry = {
    type: "Point",
    coordinates: [geoData[0].longitude, geoData[0].latitude],
  };

  await newListing.save();

  await newListing.populate("owner", "username email");

  res.status(201).json({
    message: "Listing created successfully",
    listing: newListing,
  });
};

// ======================================================
// Edit Listing - EJS
// ======================================================

module.exports.editListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");

    return res.redirect("/listings");
  }

  res.render("listings/edit", {
    listing,
  });
};

// ======================================================
// Update Listing - EJS
// ======================================================

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findByIdAndUpdate(
    id,
    {
      ...req.body.listing,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!listing) {
    req.flash("error", "Listing not found!");

    return res.redirect("/listings");
  }

  if (req.file) {
    if (listing.image?.filename) {
      await cloudinary.uploader.destroy(listing.image.filename);
    }

    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };

    await listing.save();
  }

  req.flash("success", "Listing Updated Successfully!");

  res.redirect(`/listings/${listing._id}`);
};

// ======================================================
// Update Listing - React API
// ======================================================

module.exports.updateListingApi = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    return res.status(404).json({
      message: "Listing not found!",
    });
  }

  if (req.body.listing) {
    Object.assign(listing, req.body.listing);
  }

  if (req.file) {
    if (listing.image?.filename) {
      await cloudinary.uploader.destroy(listing.image.filename);
    }

    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  if (req.body.listing?.location) {
    const geoData = await geocoder.geocode(req.body.listing.location);

    if (!geoData.length) {
      return res.status(400).json({
        message: "Unable to find the specified location",
      });
    }

    listing.geometry = {
      type: "Point",
      coordinates: [geoData[0].longitude, geoData[0].latitude],
    };
  }

  await listing.save();

  await listing.populate("owner", "username email");

  res.status(200).json({
    message: "Listing updated successfully",
    listing,
  });
};

// ======================================================
// Delete Listing - EJS
// ======================================================

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");

    return res.redirect("/listings");
  }

  if (listing.image?.filename) {
    await cloudinary.uploader.destroy(listing.image.filename);
  }

  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing Deleted Successfully!");

  res.redirect("/listings");
};

// ======================================================
// Delete Listing - React API
// ======================================================

module.exports.destroyListingApi = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    return res.status(404).json({
      message: "Listing not found!",
    });
  }

  if (listing.image?.filename) {
    await cloudinary.uploader.destroy(listing.image.filename);
  }

  await Listing.findByIdAndDelete(id);

  res.status(200).json({
    message: "Listing deleted successfully",
  });
};
