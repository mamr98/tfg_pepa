import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './Pages/Home';
import Tienda from './Pages/Tienda';
import TheVault from './Pages/TheVault';
import Lookbook from './Pages/Lookbook';
import Signals from './Pages/Signals';
import Ocultas from './Pages/Ocultas';
import Footer from './Pages/Footer';
import NotFound from './Pages/NotFound';
import './App.css'

// Creamos un componente wrapper para poder usar useLocation
function AppContent() {
  const location = useLocation();
  // List of paths where header and footer should be shown
  const pathsWithHeaderFooter = ['/', '/tienda', '/the-vault', '/lookbook', '/signals', '/short-film'];
  const showHeaderFooter = pathsWithHeaderFooter.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      {/* Añadimos padding-top para que el contenido no se solape con el Header fijo */}
      {/* Ajustamos el padding-top dinámicamente si el header no se muestra */}
      <main className={showHeaderFooter ? "pt-[82px]" : ""}>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Assuming Home.jsx is in src/Pages/ */}
          <Route path="/tienda" element={<Tienda />} /> {/* Assuming Tienda.jsx is in src/Pages/ */}
          <Route path="/the-vault" element={<TheVault />} /> {/* Assuming TheVault.jsx is in src/Pages/ */}
          <Route path="/lookbook" element={<Lookbook />} /> {/* Assuming Lookbook.jsx is in src/Pages/ */}
          <Route path="/signals" element={<Signals />} /> {/* Assuming Signals.jsx is in src/Pages/ */}
          <Route path="/short-film" element={<Ocultas />} /> {/* Assuming Ocultas.jsx is in src/Pages/ */}
          <Route path="*" element={<NotFound />} /> {/* Assuming NotFound.jsx is in src/Pages/ */}
        </Routes>
      </main>
      {showHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App;
