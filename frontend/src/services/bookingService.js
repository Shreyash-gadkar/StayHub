import API_BASE_URL from "./api";

export async function createBooking(listingId, bookingData) {
  const response = await fetch(
    `${API_BASE_URL}/api/bookings/listings/${listingId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        booking: bookingData,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create booking");
  }

  return data;
}

export async function getMyBookings() {
  const response = await fetch(`${API_BASE_URL}/api/bookings/my`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch bookings");
  }

  return data;
}

export async function getBooking(id) {
  const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch booking");
  }

  return data;
}

export async function cancelBooking(id) {
  const response = await fetch(`${API_BASE_URL}/api/bookings/${id}/cancel`, {
    method: "PATCH",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to cancel booking");
  }

  return data;
}
