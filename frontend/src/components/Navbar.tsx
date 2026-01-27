import { NavLink } from "react-router-dom";
import "../App.css";

export function Navbar() {
  return (
    <nav className="bottom-nav">
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        <span className="nav-icon"></span>
        <span>Store</span>
      </NavLink>

      <NavLink 
        to="/collection" 
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        <span className="nav-icon"></span>
        <span>Karten</span>
      </NavLink>
    </nav>
  );
}