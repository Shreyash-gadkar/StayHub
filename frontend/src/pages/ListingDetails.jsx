import { useParams } from "react-router-dom";
import listings from "../data/listings";
import { useState } from "react";
function ListingDetails() {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);

  const listing = listings.find((listing) => listing.id === Number(id));
  if (!listing) {
    return <h1>Listing Not Found 😕</h1>;
  }

  return (
    <div>
      <h1>{listing.title}</h1>

      <p>{listing.description}</p>

      <p>₹{listing.price} / night</p>

      <p>
        {listing.location}, {listing.country}
      </p>
      <button onClick={() => setLiked(!liked)}>
        {liked ? "❤️ Liked" : "🤍 Like"}
      </button>
    </div>
  );
}

export default ListingDetails;
