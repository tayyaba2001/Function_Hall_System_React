import React, { useState } from "react";

import "./Navbarlan.css";
import { Link} from "react-router-dom";

const Navbarlan = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
        <a href="/" className="title text-white text-2xl">
        Victorian Tamil Community Center
      </a>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
        <a href="#about" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
            About
          </a>
        
             </li>
        <li>
        <a href="#services" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
          Services
          </a> 
        </li>
        <li>
        <a href="#contact" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbarlan