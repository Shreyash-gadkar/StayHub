import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListing, updateListing } from "../services/listingService";
import Loading from "../components/Loading";

function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchListing() {
      try {
        setLoading(true);
        setError("");

        const data = await getListing(id);

        setTitle(data.title || "");
        setDescription(data.description || "");
        setPrice(data.price ?? "");
        setLocation(data.location || "");
        setCountry(data.country || "");
      } catch (error) {
        console.error("Failed to fetch listing:", error);
        setError(error.message || "Failed to fetch listing.");
      } finally {
        setLoading(false);
      }
    }

    fetchListing();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitting(true);
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
      await updateListing(id, formData);

      alert("Listing updated successfully!");

      navigate(`/listings/${id}`);
    } catch (error) {
      console.error("Failed to update listing:", error);

      setError(error.message || "Failed to update listing.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <Loading message="Loading listing..." />;
  }

  if (error && !title) {
    return (
      <main className="page-container">
        <p className="error-message">{error}</p>
      </main>
    );
  }

  return (
    <main className="form-page">
      <h1>Edit Listing</h1>

      {error && <p className="error-message">{error}</p>}

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            minLength={3}
            maxLength={100}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            minLength={10}
            maxLength={2000}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price per night</label>

          <input
            id="price"
            type="number"
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
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            minLength={2}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>

          <input
            id="country"
            type="text"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            minLength={2}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Replace Image</label>

          <input
            id="image"
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={(event) => setImage(event.target.files?.[0] || null)}
          />
        </div>

        <button type="submit" className="primary-button" disabled={submitting}>
          {submitting ? "Updating Listing..." : "Update Listing"}
        </button>
      </form>
    </main>
  );
}

export default EditListing;
