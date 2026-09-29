import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-badge">🏠 Welcome to StayHub</p>

          <h1>Find your perfect stay.</h1>

          <p className="hero-description">
            Discover comfortable places to stay, explore amazing destinations,
            and book your next trip with StayHub.
          </p>

          <div className="hero-actions">
            <Link to="/listings" className="primary-button">
              Explore Listings
            </Link>

            <Link to="/listings/new" className="secondary-button">
              Create Listing
            </Link>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h2>Explore Stays</h2>
          <p>
            Browse available properties and find a stay that matches your needs.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <h2>Easy Booking</h2>
          <p>
            Choose your dates and guests, then book your stay in just a few
            clicks.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🏡</div>
          <h2>Become a Host</h2>
          <p>
            Have a property to share? Create a listing and welcome guests to
            your stay.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
