const express = require("express");
const router = express.Router();

const {
  isLoggedIn,
  isBookingOwner,
  validateBooking,
} = require("../middleware");

const wrapAsync = require("../utils/wrapAsync");
const bookingController = require("../controllers/bookings");

router.post(
  "/listings/:listingId",
  isLoggedIn,
  validateBooking,
  wrapAsync(bookingController.createBooking),
);

router.get("/my", isLoggedIn, wrapAsync(bookingController.getMyBookings));

router.get("/host", isLoggedIn, wrapAsync(bookingController.getHostBookings));

router.get(
  "/:id",
  isLoggedIn,
  isBookingOwner,
  wrapAsync(bookingController.getBooking),
);

router.patch(
  "/:id/cancel",
  isLoggedIn,
  isBookingOwner,
  wrapAsync(bookingController.cancelBooking),
);

module.exports = router;
