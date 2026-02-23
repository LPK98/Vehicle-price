import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="text-lg font-semibold">
          Vehicle Tracker
        </Link>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <div className={`md:flex items-center ${open ? "block" : "hidden"}`}>
          {user ? (
            <>
              <Link to="/dashboard" className="block px-2 py-1">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="block px-2 py-1">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-2 py-1">
                Login
              </Link>
              <Link to="/register" className="block px-2 py-1">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
