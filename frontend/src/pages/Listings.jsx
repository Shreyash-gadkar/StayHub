import ListingCard from "../components/ListingCard";
import listings from "../data/listings";
import { useState } from "react";

function Listings() {
  const [search, setSearch] = useState("");
  const filteredListings = listings.filter((listing) =>
    listing.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div>
      <h1>All Listings</h1>
      <input
        type="text"
        placeholder="Search listings..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredListings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}

export default Listings;
