import React from 'react';
import { Link } from 'react-router-dom';
// Puedes crear un archivo CSS para estilizar tu header, por ejemplo: import './Header.css';

function Header() {
  return (
    <header
      className="bg-transparent py-4 px-6 md:px-8 fixed top-0 left-0 w-full z-[1000] flex justify-between items-center"
    >
      <Link to="/">
        <img src={LOGO_URL} alt="Logo Principal" className="h-10" /> {/* Ajusta h-10 (40px) según necesites */}
      </Link>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tienda">Tienda</Link></li>
          <li><Link to="/the-vault">The vault</Link></li>
          <li><Link to="/lookbook">Lookbook</Link></li>
          <li><Link to="/signals">Signals</Link></li>
          <li><Link to="/ocultas">Ocultas 🔐</Link></li>
          {/* La página 404 se maneja con una ruta catch-all, no se enlaza directamente aquí */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;