import { NavLink } from "react-router-dom";
import "../App.css";
import { GiCardRandom, GiShop } from "react-icons/gi";

export function Navbar() {
  return (
    <nav className="bottom-nav">
      <div className="container-limit">
        
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <GiShop size={24} className="nav-icon" />
          <span>Store</span>
        </NavLink>

        <NavLink 
          to="/collection" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <GiCardRandom size={24} className="nav-icon" />
          <span>Karten</span>
        </NavLink>

      </div>
    </nav>
  );
}