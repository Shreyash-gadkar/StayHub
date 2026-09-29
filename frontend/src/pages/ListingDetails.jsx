import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  deleteListing,
  getListing,
  createReview,
  deleteReview,
} from "../services/listingService";
import BookingForm from "../components/BookingForm";
import Loading from "../components/Loading";

function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [listing, setListing] = useState(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  // Review states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [deletingReviewId, setDeletingReviewId] = useState(null);

  // ======================================================
  // Fetch Listing
  // ======================================================

  useEffect(() => {
    async function fetchListing() {
      try {
        setLoading(true);
        setError("");

        const data = await getListing(id);
        setListing(data);
      } catch (error) {
        console.error("Failed to fetch listing:", error);
        setError(error.message || "Failed to fetch listing.");
      } finally {
        setLoading(false);
      }
    }

    fetchListing();
  }, [id]);

  // ======================================================
  // Delete Listing
  // ======================================================

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");

      await deleteListing(id);
      navigate("/listings");
    } catch (error) {
      console.error("Failed to delete listing:", error);
      setError(error.message || "Failed to delete listing.");
      setDeleting(false);
    }
  }

  // ======================================================
  // Create Review
  // ======================================================

  async function handleReviewSubmit(event) {
    event.preventDefault();

    if (!comment.trim()) {
      setReviewError("Please write a comment.");
      return;
    }

    try {
      setReviewLoading(true);
      setReviewError("");

      await createReview(id, {
        rating: Number(rating),
        comment: comment.trim(),
      });

      // Fetch listing again so the new review appears
      const updatedListing = await getListing(id);
      setListing(updatedListing);

      // Clear form
      setRating(5);
      setComment("");
    } catch (error) {
      console.error("Failed to create review:", error);
      setReviewError(error.message || "Failed to submit review.");
    } finally {
      setReviewLoading(false);
    }
  }

  // ======================================================
  // Delete Review
  // ======================================================

  async function handleDeleteReview(reviewId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?",
    );

    if (!confirmed) return;

    try {
      setDeletingReviewId(reviewId);
      setReviewError("");

      await deleteReview(id, reviewId);

      // Fetch listing again so the deleted review disappears
      const updatedListing = await getListing(id);
      setListing(updatedListing);
    } catch (error) {
      console.error("Failed to delete review:", error);
      setReviewError(error.message || "Failed to delete review.");
    } finally {
      setDeletingReviewId(null);
    }
  }

  // ======================================================
  // Loading State
  // ======================================================

  if (loading) {
    return <Loading message="Loading listing..." />;
  }

  // ======================================================
  // Error State
  // ======================================================

  if (error) {
    return (
      <main className="page-container">
        <p className="error-message">{error}</p>
      </main>
    );
  }

  // ======================================================
  // Listing Not Found
  // ======================================================

  if (!listing) {
    return (
      <main className="page-container">
        <p className="error-message">Listing not found.</p>
      </main>
    );
  }

  // ======================================================
  // Check Listing Owner
  // ======================================================

  const isOwner =
    user && listing.owner && String(listing.owner._id) === String(user.id);

  // ======================================================
  // UI
  // ======================================================

  return (
    <main className="page-container listing-details-page">
      {/* =========================
          LISTING DETAILS
      ========================== */}

      <div className="listing-details">
        <div className="listing-details-image-wrapper">
          <img
            src={listing.image?.url || "/placeholder.jpg"}
            alt={listing.title}
            className="listing-details-image"
          />
        </div>

        <div className="listing-details-content">
          <p className="listing-location">
            {listing.location}, {listing.country}
          </p>

          <h1 className="page-title">{listing.title}</h1>

          <p className="listing-description">{listing.description}</p>

          <h2>
            ₹{listing.price} <span>/ night</span>
          </h2>

          {listing.owner && (
            <p className="listing-owner">
              Hosted by <strong>{listing.owner.username}</strong>
            </p>
          )}

          {/* Like Button */}

          <button
            type="button"
            className="secondary-button"
            onClick={() => setLiked((previous) => !previous)}
          >
            {liked ? "❤️ Liked" : "🤍 Like"}
          </button>

          {/* Owner Actions */}

          {isOwner && (
            <div className="listing-owner-actions">
              <Link
                to={`/listings/${listing._id}/edit`}
                className="primary-button"
              >
                Edit Listing
              </Link>

              <button
                type="button"
                className="delete-button"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete Listing"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =========================
          BOOKING
      ========================== */}

      {user && !isOwner && <BookingForm listing={listing} />}

      {!user && (
        <div className="booking-login-message">
          <h2>Want to book this stay?</h2>

          <p>Please log in to make a booking.</p>

          <Link to="/login" className="primary-button">
            Login to Book
          </Link>
        </div>
      )}

      {/* =========================
          REVIEWS
      ========================== */}

      {/* =========================
    REVIEWS
========================== */}

      <section className="reviews-section">
        {/* Reviews Header */}
        <div className="reviews-header">
          <div>
            <h2>Guest Reviews</h2>

            <p className="reviews-subtitle">
              See what guests say about this stay
            </p>
          </div>

          {listing.reviews?.length > 0 && (
            <div className="reviews-count">
              <span>⭐</span>
              <strong>{listing.reviews.length}</strong>
              <span>
                {listing.reviews.length === 1 ? " Review" : " Reviews"}
              </span>
            </div>
          )}
        </div>

        {/* =========================
      REVIEW FORM
  ========================== */}

        {user && !isOwner && (
          <div className="review-form-card">
            <div className="review-form-header">
              <div className="review-user-avatar">
                {user.username?.charAt(0).toUpperCase() || "U"}
              </div>

              <div>
                <h3>Share your experience</h3>
                <p>Your review helps other guests.</p>
              </div>
            </div>

            <form onSubmit={handleReviewSubmit}>
              {/* Rating */}

              <div className="review-rating-field">
                <label>Your rating</label>

                <div className="star-rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={
                        star <= Number(rating)
                          ? "rating-star active"
                          : "rating-star"
                      }
                      onClick={() => setRating(star)}
                      aria-label={`Rate ${star} out of 5`}
                    >
                      ★
                    </button>
                  ))}

                  <span className="rating-value">{rating}/5</span>
                </div>
              </div>

              {/* Comment */}

              <div className="review-comment-field">
                <label htmlFor="comment">Your review</label>

                <textarea
                  id="comment"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="What did you like about this stay?"
                  rows="4"
                  maxLength="500"
                  required
                />

                <div className="character-count">{comment.length}/500</div>
              </div>

              {/* Error */}

              {reviewError && <div className="review-error">{reviewError}</div>}

              {/* Submit */}

              <button
                type="submit"
                className="review-submit-button"
                disabled={reviewLoading}
              >
                {reviewLoading ? (
                  "Submitting..."
                ) : (
                  <>
                    <span>✦</span>
                    Submit Review
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Login Message */}

        {!user && (
          <div className="review-login-card">
            <div className="login-review-icon">⭐</div>

            <div>
              <h3>Have you stayed here?</h3>

              <p>Log in to share your experience with other guests.</p>

              <Link to="/login">Log in to write a review →</Link>
            </div>
          </div>
        )}

        {/* Owner Message */}

        {user && isOwner && (
          <div className="review-owner-message">
            <span>🏠</span>
            You cannot review your own listing.
          </div>
        )}

        {/* =========================
      EXISTING REVIEWS
  ========================== */}

        {listing.reviews?.length > 0 ? (
          <div className="reviews-list">
            {listing.reviews.map((review) => {
              const isReviewAuthor =
                user &&
                review.author &&
                String(review.author._id) === String(user.id);

              const username = review.author?.username || "User";

              return (
                <article key={review._id} className="review-card">
                  {/* Review Top */}

                  <div className="review-card-top">
                    <div className="review-author">
                      <div className="review-avatar">
                        {username.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <strong>{username}</strong>

                        <div className="review-stars">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </div>
                      </div>
                    </div>

                    {/* Delete */}

                    {isReviewAuthor && (
                      <button
                        type="button"
                        className="review-delete-button"
                        onClick={() => handleDeleteReview(review._id)}
                        disabled={deletingReviewId === review._id}
                        title="Delete review"
                      >
                        {deletingReviewId === review._id ? "..." : "🗑️"}
                      </button>
                    )}
                  </div>

                  {/* Review Text */}

                  <p className="review-comment">{review.comment}</p>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-reviews">
            <div className="empty-review-icon">💬</div>

            <h3>No reviews yet</h3>

            <p>Be the first guest to share your experience.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default ListingDetails;
