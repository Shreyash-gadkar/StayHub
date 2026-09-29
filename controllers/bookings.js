const Booking = require("../models/Booking");
const Listing = require("../models/Listing");

module.exports.createBooking = async (req, res) => {
  const { listingId } = req.params;
  const { checkIn, checkOut, guests } = req.body.booking;

  const listing = await Listing.findById(listingId);

  if (!listing) {
    return res.status(404).json({
      message: "Listing not found!",
    });
  }

  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);

  if (startDate < new Date()) {
    return res.status(400).json({
      message: "Check-in date cannot be in the past.",
    });
  }

  if (endDate <= startDate) {
    return res.status(400).json({
      message: "Check-out date must be after check-in date.",
    });
  }

  if (guests < 1 || guests > 20) {
    return res.status(400).json({
      message: "Guests must be between 1 and 20.",
    });
  }

  const overlappingBooking = await Booking.findOne({
    listing: listingId,
    status: {
      $in: ["confirmed", "completed"],
    },
    checkIn: {
      $lt: endDate,
    },
    checkOut: {
      $gt: startDate,
    },
  });

  if (overlappingBooking) {
    return res.status(409).json({
      message: "This listing is already booked for the selected dates.",
    });
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const nights = Math.ceil((endDate - startDate) / millisecondsPerDay);

  const totalPrice = nights * listing.price;

  const booking = new Booking({
    listing: listingId,
    user: req.user._id,
    checkIn: startDate,
    checkOut: endDate,
    guests: Number(guests),
    totalPrice,
    status: "confirmed",
  });

  await booking.save();

  await booking.populate([
    {
      path: "listing",
    },
    {
      path: "user",
      select: "username email",
    },
  ]);

  res.status(201).json({
    message: "Booking created successfully",
    booking,
  });
};

module.exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({
    user: req.user._id,
  })
    .populate("listing")
    .sort({ createdAt: -1 });

  res.status(200).json({
    bookings,
  });
};

module.exports.getHostBookings = async (req, res) => {
  const listings = await Listing.find({
    owner: req.user._id,
  }).select("_id");

  const listingIds = listings.map((listing) => listing._id);

  const bookings = await Booking.find({
    listing: {
      $in: listingIds,
    },
  })
    .populate("listing")
    .populate("user", "username email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    bookings,
  });
};

module.exports.getBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("listing")
    .populate("user", "username email");

  if (!booking) {
    return res.status(404).json({
      message: "Booking not found!",
    });
  }

  if (!booking.user._id.equals(req.user._id)) {
    return res.status(403).json({
      message: "You are not authorized to access this booking!",
    });
  }

  res.status(200).json({
    booking,
  });
};

module.exports.cancelBooking = async (req, res) => {
  const booking = req.booking;

  if (booking.status === "cancelled") {
    return res.status(400).json({
      message: "Booking is already cancelled.",
    });
  }

  if (booking.status === "completed") {
    return res.status(400).json({
      message: "Completed bookings cannot be cancelled.",
    });
  }

  booking.status = "cancelled";

  await booking.save();

  res.status(200).json({
    message: "Booking cancelled successfully",
    booking,
  });
};
