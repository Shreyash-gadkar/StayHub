import { useState } from "react";
import { cancelBooking } from "../services/bookingService";

function BookingCard({ booking, onBookingCancelled }) {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const listing = booking.listing;

  const checkIn = new Date(booking.checkIn).toLocaleDateString();

  const checkOut = new Date(booking.checkOut).toLocaleDateString();

  async function handleCancel() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      await cancelBooking(booking._id);

      if (onBookingCancelled) {
        onBookingCancelled(booking._id);
      }
    } catch (error) {
      setError(error.message || "Failed to cancel booking.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="booking-card">
      <div className="booking-card-image">
        <img
          src={listing?.image?.url || "/placeholder.jpg"}
          alt={listing?.title || "StayHub listing"}
        />
      </div>

      <div className="booking-card-content">
        <h2>{listing?.title || "Listing unavailable"}</h2>

        <p>
          {listing?.location}, {listing?.country}
        </p>

        <p>
          <strong>Check-in:</strong> {checkIn}
        </p>

        <p>
          <strong>Check-out:</strong> {checkOut}
        </p>

        <p>
          <strong>Guests:</strong> {booking.guests}
        </p>

        <p>
          <strong>Total:</strong> ₹{booking.totalPrice}
        </p>

        <p>
          <strong>Status:</strong> {booking.status}
        </p>

        {error && <p className="error-message">{error}</p>}

        {booking.status === "confirmed" && (
          <button
            type="button"
            className="secondary-button"
            onClick={handleCancel}
            disabled={loading}
          >
            {loading ? "Cancelling..." : "Cancel Booking"}
          </button>
        )}
      </div>
    </article>
  );
}

export default BookingCard;
