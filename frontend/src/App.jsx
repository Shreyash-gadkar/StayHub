import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";

import Signup from "./pages/Signup";
import Login from "./pages/Login";

import MyBookings from "./pages/MyBookings";
import HostBookings from "./pages/HostBookings";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          {/* Public Routes */}

          <Route path="/" element={<Home />} />

          <Route path="/listings" element={<Listings />} />

          <Route path="/listings/:id" element={<ListingDetails />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} />

          {/* Protected Listing Routes */}

          <Route
            path="/listings/new"
            element={
              <ProtectedRoute>
                <CreateListing />
              </ProtectedRoute>
            }
          />

          <Route
            path="/listings/:id/edit"
            element={
              <ProtectedRoute>
                <EditListing />
              </ProtectedRoute>
            }
          />

          {/* Protected Booking Routes */}

          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/host-bookings"
            element={
              <ProtectedRoute>
                <HostBookings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
