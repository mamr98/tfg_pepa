import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
<header className="bg-transparent py-4 fixed top-0 left-0 w-full z-[1000] flex items-center justify-between px-4 text-white md:hidden">
      {/* Logo on the left */}
      <div>
        <Link to="/">
<img
  src="/images/logo/logo.svg"
  alt="Logo de la empresa"
  className="w-40 h-10 flex-shrink-0 object-contain"
/>
        </Link>
      </div>

      {/* Hamburger menu on the right */}
      <div className="text-2xl" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Dropdown menu */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-black text-white flex flex-col space-y-2 p-4">
          <NavLink
            to="/tienda"
            className={({ isActive }) =>
              (isActive ? "text-red-600" : "") + " block px-4 py-2"
            }
            onClick={() => setMenuOpen(false)}
          >
            tienda
          </NavLink>
          <NavLink
            to="/the-vault"
            className={({ isActive }) =>
              (isActive ? "text-red-600" : "") + " block px-4 py-2"
            }
            onClick={() => setMenuOpen(false)}
          >
            the vault
          </NavLink>
          <NavLink
            to="/lookbook"
            className={({ isActive }) =>
              (isActive ? "text-red-600" : "") + " block px-4 py-2"
            }
            onClick={() => setMenuOpen(false)}
          >
            lookbook
          </NavLink>
          <NavLink
            to="/signals"
            className={({ isActive }) =>
              (isActive ? "text-red-600" : "") + " block px-4 py-2"
            }
            onClick={() => setMenuOpen(false)}
          >
            signals
          </NavLink>
        </nav>
      )}
    </header>
  );
}

export default MobileMenu;
