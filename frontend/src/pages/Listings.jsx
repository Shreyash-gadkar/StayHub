import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import Loading from "../components/Loading";
import { getListings } from "../services/listingService";

function Listings() {
  const [search, setSearch] = useState("");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchListings() {
      try {
        setLoading(true);
        setError("");

        const data = await getListings();
        setListings(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
        setError(error.message || "Failed to fetch listings.");
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  const filteredListings = listings.filter((listing) => {
    const searchText = search.toLowerCase().trim();

    return (
      listing.title?.toLowerCase().includes(searchText) ||
      listing.location?.toLowerCase().includes(searchText) ||
      listing.country?.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="page-container listings-page">
      <div className="listings-header">
        <h1 className="page-title">Explore Listings</h1>

        <input
          type="text"
          className="listings-search"
          placeholder="Search by title, location, or country..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading && <Loading message="Loading listings..." />}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          {filteredListings.length > 0 ? (
            <div className="listings-grid">
              {filteredListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No listings found</h2>
              <p>Try a different search term.</p>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Listings;
