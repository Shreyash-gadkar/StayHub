import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ListingDetails() {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch(`https://stayhub-v40w.onrender.com/listings/api/${id}`)
      .then((response) => {
        console.log("STATUS:", response.status);
        return response.text();
      })
      .then((data) => {
        console.log("RESPONSE:", data);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }, [id]);

  if (!listing) {
    return <h1>Loading...</h1>;
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
