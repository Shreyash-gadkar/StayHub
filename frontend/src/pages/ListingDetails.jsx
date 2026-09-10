import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ListingDetails() {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/listings/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("LISTING DATA:", data);
        setListing(data);
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
      <img src={listing.image.url} alt={listing.title} />

      <h1>{listing.title}</h1>

      <p>{listing.description}</p>

      <p>₹{listing.price} / night</p>

      <p>
        {listing.location}, {listing.country}
      </p>

      <p>Owner: {listing.owner.username}</p>

      <button onClick={() => setLiked(!liked)}>
        {liked ? "❤️ Liked" : "🤍 Like"}
      </button>

      <h2>Reviews</h2>

      {listing.reviews.map((review) => (
        <div key={review._id}>
          <p>{review.comment}</p>
          <p>Rating: ⭐ {review.rating}/5</p>
          <p>By: {review.author.username}</p>
        </div>
      ))}
    </div>
  );
}

export default ListingDetails;
