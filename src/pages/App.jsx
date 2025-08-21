import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Feed from "./pages/Feed";
import DonorNewListing from "./pages/DonorNewListing";
import MyClaims from "./pages/MyClaims";

export default function App() {
  return (
    <Router>
      <div>
        {/* ✅ Navbar */}
        <nav className="bg-green-700 text-white p-4 flex justify-between">
          <h1 className="font-bold text-lg">🍽 Surplus Food</h1>
          <div className="space-x-4">
            <Link to="/feed" className="hover:underline">Feed</Link>
            <Link to="/donate" className="hover:underline">Donate</Link>
            <Link to="/my-claims" className="hover:underline">My Claims</Link>
          </div>
        </nav>

        {/* ✅ Page Routes */}
        <Routes>
          <Route path="/feed" element={<Feed />} />
          <Route path="/donate" element={<DonorNewListing />} />
          <Route path="/my-claims" element={<MyClaims />} />
          <Route path="*" element={<Feed />} /> {/* default route */}
        </Routes>
      </div>
    </Router>
  );
}
