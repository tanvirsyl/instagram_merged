import React, { useContext, useState } from "react";
import logo from "../img/logo.png";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { FaHome, FaPlus, FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaHeart } from 'react-icons/fa';

export default function Navbar({ login }) {
  const { setModalOpen } = useContext(LoginContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem("jwt");

  const menuItems = token || login ? [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/profile", icon: <FaUser />, label: "Profile" },
    { to: "/createPost", icon: <FaPlus />, label: "Create" },
    { to: "/followingpost", icon: <FaHeart />, label: "Following" },
    { to: "#", icon: <FaSignOutAlt />, label: "Logout", onClick: () => setModalOpen(true) },
  ] : [
    { to: "/signup", icon: <FaUserPlus />, label: "Sign Up" },
    { to: "/signin", icon: <FaSignInAlt />, label: "Sign In" },
  ];

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to={token ? "/" : "/signin"} className="navbar-logo">
          <img src={logo} alt="Instagram" />
        </Link>

        {/* Mobile menu toggle */}
        <button className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>

        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          {menuItems.map(({ to, icon, label, onClick }) => (
            <Link to={to} className="nav-links" key={label} onClick={onClick}>
              <li>{icon} {label}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
