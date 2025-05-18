import React from "react";
import MobileMenu from "./MobileMenu";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      {/* Show MobileMenu on small screens */}
      <div className="md:hidden">
        <MobileMenu />
      </div>

      {/* Show full header on medium and larger screens */}
      <div className="hidden md:block">
        <header className="bg-transparent py-4 fixed top-0 left-0 w-full z-[1000]">
          <div className="flex items-center justify-between px-[52px] gap-x-16">
            {/* Logo */}
            <div>
              <Link to="/">
<img
  src="/images/logo/logo.svg"
  alt="Logo de la empresa"
  className="w-40 h-10 flex-shrink-0 object-contain"
/>
              </Link>
            </div>

            {/* Navegación centrada */}
            <nav className="flex space-x-48 md:space-x-24 sm:space-x-12 text-lg font-light text-white flex-nowrap whitespace-nowrap">
              <NavLink
                to="/tienda"
                className={({ isActive }) => (isActive ? "text-red-600" : "")}
              >
                tienda
              </NavLink>
              <NavLink
                to="/the-vault"
                className={({ isActive }) => (isActive ? "text-red-600" : "")}
              >
                the vault
              </NavLink>
              <NavLink
                to="/lookbook"
                className={({ isActive }) => (isActive ? "text-red-600" : "")}
              >
                lookbook
              </NavLink>
              <NavLink
                to="/signals"
                className={({ isActive }) => (isActive ? "text-red-600" : "")}
              >
                signals
              </NavLink>
            </nav>

            {/* Iconos a la derecha */}
            <div className="flex items-center space-x-8 text-white text-xl">
              <Link to="/" className="flex items-center">
                <img src="/images/logo/favs.png" className="h-4" />
              </Link>
              <Link to="/" className="flex items-center">
                <img src="/images/iconos/tag.png" className="h-4" />
              </Link>
              <Link to="/" className="flex items-center">
                <img src="/images/iconos/user.png" className="h-4" />
              </Link>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
