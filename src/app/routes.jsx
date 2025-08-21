import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import Feed from "../pages/Feed";
import DonorNewListing from "../pages/DonorNewListing";
import MyClaims from "../pages/MyClaims";
import Dashboard from "../pages/Dashboard";

export default function AppRoutes() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/donate" element={<DonorNewListing />} />
          <Route path="/claims" element={<MyClaims />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* default route */}
          <Route path="*" element={<Navigate to="/feed" replace />} />
        </Routes>
      </div>
    </div>
  );
}
