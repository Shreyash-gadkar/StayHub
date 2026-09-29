import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import API_BASE_URL from "../services/api";

function HostBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHostBookings() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/api/bookings/host`, {
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch host bookings.");
        }

        setBookings(data.bookings || []);
      } catch (error) {
        console.error("Failed to fetch host bookings:", error);

        setError(error.message || "Failed to fetch host bookings.");
      } finally {
        setLoading(false);
      }
    }

    fetchHostBookings();
  }, []);

  if (loading) {
    return <Loading message="Loading host bookings..." />;
  }

  return (
    <main className="page-container">
      <h1 className="page-title">Host Bookings</h1>

      {error && <p className="error-message">{error}</p>}

      {!error && bookings.length === 0 && (
        <div className="empty-state">
          <h2>No bookings yet</h2>
          <p>You don't have any bookings for your listings yet.</p>
        </div>
      )}

      {!error && bookings.length > 0 && (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <article key={booking._id} className="booking-card">
              <div className="booking-card-content">
                <h2>{booking.listing?.title || "Listing unavailable"}</h2>

                <p>
                  <strong>Guest:</strong>{" "}
                  {booking.user?.username || "Unknown user"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {booking.user?.email || "Not available"}
                </p>

                <p>
                  <strong>Check-in:</strong>{" "}
                  {new Date(booking.checkIn).toLocaleDateString()}
                </p>

                <p>
                  <strong>Check-out:</strong>{" "}
                  {new Date(booking.checkOut).toLocaleDateString()}
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
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default HostBookings;
