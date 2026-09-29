import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "../services/listingService";

function CreateListing() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData();

    formData.append("listing[title]", title.trim());
    formData.append("listing[description]", description.trim());
    formData.append("listing[price]", price);
    formData.append("listing[location]", location.trim());
    formData.append("listing[country]", country.trim());

    if (image) {
      formData.append("image", image);
    }

    try {
      const data = await createListing(formData);

      alert("Listing created successfully!");

      navigate(`/listings/${data.listing._id}`);
    } catch (error) {
      console.error("Failed to create listing:", error);

      setError(error.message || "Failed to create listing.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="create-listing-page">
      <h1>Create New Listing</h1>

      {error && <p className="error-message">{error}</p>}

      <form className="listing-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>

          <input
            id="title"
            type="text"
            placeholder="Enter listing title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            minLength={3}
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            placeholder="Describe your property"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            minLength={10}
            maxLength={2000}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price per night</label>

          <input
            id="price"
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>

          <input
            id="location"
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
            minLength={2}
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>

          <input
            id="country"
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            required
            minLength={2}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image" className="image-label">
            Choose Listing Image
          </label>

          <input
            id="image"
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={(event) => setImage(event.target.files?.[0] || null)}
          />
        </div>

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Creating Listing..." : "Create Listing"}
        </button>
      </form>
    </main>
  );
}

export default CreateListing;
