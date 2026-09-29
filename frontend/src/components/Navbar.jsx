import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, loading, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          StayHub 🏠
        </Link>

        <div className="navbar-links">
          <Link to="/">Home</Link>

          <Link to="/listings">Listings</Link>

          {loading ? (
            <span>Checking...</span>
          ) : user ? (
            <>
              <Link to="/listings/new">Create Listing</Link>

              <Link to="/my-bookings">My Bookings</Link>

              <Link to="/host-bookings">Host Bookings</Link>

              <span className="navbar-user">Welcome, {user.username} 👋</span>

              <button
                type="button"
                className="navbar-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>

              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
