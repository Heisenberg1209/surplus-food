import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, label }) => {
  const loc = useLocation();
  const isActive = loc.pathname === to;
  return (
    <Link
      to={to}
      className={
        "px-3 py-2 rounded-md text-sm font-medium " +
        (isActive ? "bg-gray-900 text-white" : "text-gray-100 hover:bg-gray-700")
      }
    >
      {label}
    </Link>
  );
};

export default function Navbar() {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/feed" className="text-white font-semibold">
            Surplus Food
          </Link>
          <div className="flex gap-1">
            <NavLink to="/feed" label="Feed" />
            <NavLink to="/donate" label="Donate" />
            <NavLink to="/claims" label="My Claims" />
            <NavLink to="/dashboard" label="Dashboard" />
            <NavLink to="/login" label="Login" />
          </div>
        </div>
      </div>
    </nav>
  );
}
