import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUser, FaTags } from "react-icons/fa";

function Header() {
  return (
    <header className="bg-transparent py-4 fixed top-0 left-0 w-full z-[1000]">
      <div className="flex items-center justify-between px-[52px] gap-x-16">
        {/* Logo */}
        <div>
          <Link to="/">
            <img
              src="/images/logo/logo.svg"
              alt="Logo de la empresa"
              className="h-10"
            />
          </Link>
        </div>

        {/* Navegación centrada */}
        {/* Ajustado space-x-58 a space-x-8 para un espaciado más estándar */}
        <nav className="flex space-x-58 text-white text-lg font-light">
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
            <img
              src="/images/logo/favs.png"
              className="h-4"
            />
          </Link>
          <Link to="/" className="flex items-center">
            <img
              src="/images/iconos/tag.png"
              className="h-4"
            />
          </Link>
          <Link to="/" className="flex items-center">
            <img
              src="/images/iconos/user.png"
              className="h-4"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
