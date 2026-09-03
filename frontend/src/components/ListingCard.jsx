import { Link } from "react-router-dom";

function ListingCard({ listing }) {
  return (
    <div>
      <img src={listing.image} alt={listing.title} />

      <h2>{listing.title}</h2>

      <p>{listing.description}</p>

      <p>₹{listing.price} / night</p>

      <p>
        {listing.location}, {listing.country}
      </p>
      <Link to={`/listings/${listing.id}`}>View Details</Link>
    </div>
  );
}

export default ListingCard;
