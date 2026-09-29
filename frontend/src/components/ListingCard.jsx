import { Link } from "react-router-dom";

function ListingCard({ listing }) {
  return (
    <article className="listing-card">
      <Link to={`/listings/${listing._id}`} className="listing-card-image-link">
        <img
          src={listing.image?.url || "/placeholder.jpg"}
          alt={listing.title}
          className="listing-card-image"
        />
      </Link>

      <div className="listing-card-content">
        <h2 className="listing-card-title">{listing.title}</h2>

        <p className="listing-card-location">
          {listing.location}, {listing.country}
        </p>

        <p className="listing-card-description">{listing.description}</p>

        <div className="listing-card-footer">
          <strong>₹{listing.price}</strong>

          <span>/ night</span>
        </div>

        <Link to={`/listings/${listing._id}`} className="listing-card-button">
          View Details
        </Link>
      </div>
    </article>
  );
}

export default ListingCard;
