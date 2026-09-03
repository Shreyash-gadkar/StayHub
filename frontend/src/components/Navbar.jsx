import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>StayHub 🏠</h2>

      <Link to="/">Home</Link>
      {" | "}
      <Link to="/listings">Listings</Link>
    </nav>
  );
}

export default Navbar;
