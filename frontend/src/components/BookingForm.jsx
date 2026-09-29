import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../services/bookingService";

function BookingForm({ listing }) {
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");

  const [checkOut, setCheckOut] = useState("");

  const [guests, setGuests] = useState(1);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates.");
      return;
    }

    if (checkOut <= checkIn) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    try {
      setLoading(true);

      await createBooking(listing._id, {
        checkIn,
        checkOut,
        guests: Number(guests),
      });

      setSuccess("Booking created successfully!");

      setCheckIn("");
      setCheckOut("");
      setGuests(1);

      setTimeout(() => {
        navigate("/my-bookings");
      }, 1000);
    } catch (error) {
      setError(error.message || "Failed to create booking.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="booking-form">
      <h2>Book this stay</h2>

      <p>₹{listing.price} / night</p>

      {error && <p className="error-message">{error}</p>}

      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="checkIn">Check-in</label>

          <input
            id="checkIn"
            type="date"
            value={checkIn}
            min={new Date().toISOString().split("T")[0]}
            onChange={(event) => setCheckIn(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="checkOut">Check-out</label>

          <input
            id="checkOut"
            type="date"
            value={checkOut}
            min={checkIn || new Date().toISOString().split("T")[0]}
            onChange={(event) => setCheckOut(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="guests">Guests</label>

          <input
            id="guests"
            type="number"
            min="1"
            max="20"
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
            required
          />
        </div>

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
