import { useEffect, useState } from "react";
import BookingCard from "../components/BookingCard";
import Loading from "../components/Loading";
import { getMyBookings } from "../services/bookingService";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        setError("");

        const data = await getMyBookings();

        setBookings(data.bookings || []);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);

        setError(error.message || "Failed to fetch your bookings.");
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  function handleBookingCancelled(bookingId) {
    setBookings((previousBookings) =>
      previousBookings.map((booking) =>
        booking._id === bookingId
          ? {
              ...booking,
              status: "cancelled",
            }
          : booking,
      ),
    );
  }

  if (loading) {
    return <Loading message="Loading your bookings..." />;
  }

  return (
    <main className="page-container my-bookings-page">
      <h1 className="page-title">My Bookings</h1>

      {error && <p className="error-message">{error}</p>}

      {!error && bookings.length === 0 && (
        <div className="empty-state">
          <h2>No bookings yet</h2>

          <p>You haven't booked any stays yet.</p>
        </div>
      )}

      {!error && bookings.length > 0 && (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onBookingCancelled={handleBookingCancelled}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default MyBookings;
