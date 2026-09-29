import API_BASE_URL from "./api";

export async function getListings() {
  const response = await fetch(`${API_BASE_URL}/listings/api`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch listings");
  }

  return data;
}

export async function getListing(id) {
  const response = await fetch(`${API_BASE_URL}/listings/api/${id}`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch listing");
  }

  return data;
}

export async function createListing(formData) {
  const response = await fetch(`${API_BASE_URL}/listings/api`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create listing");
  }

  return data;
}

export async function updateListing(id, formData) {
  const response = await fetch(`${API_BASE_URL}/listings/api/${id}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update listing");
  }

  return data;
}

export async function deleteListing(id) {
  const response = await fetch(`${API_BASE_URL}/listings/api/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete listing");
  }

  return data;
}
export async function createReview(id, reviewData) {
  const response = await fetch(`${API_BASE_URL}/listings/${id}/reviews/api`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      review: reviewData,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create review");
  }

  return data;
}
export async function deleteReview(listingId, reviewId) {
  const response = await fetch(
    `${API_BASE_URL}/listings/${listingId}/reviews/api/${reviewId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete review");
  }

  return data;
}
