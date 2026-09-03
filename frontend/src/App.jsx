import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListingDetails from "./pages/ListingDetails";
import Navbar from "./components/Navbar";
import Listings from "./pages/Listings";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
