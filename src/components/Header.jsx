import React from "react";
import { Link } from "react-router-dom";
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
        <nav className="flex space-x-58 text-white text-lg font-light">
          <Link to="/tienda">tienda</Link>
          <Link to="/the-vault">the vault</Link>
          <Link to="/lookbook">lookbook</Link>
          <Link to="/signals">signals</Link>
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
