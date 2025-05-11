import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Tienda from './pages/Tienda';
import TheVault from './pages/TheVault';
import Lookbook from './pages/Lookbook';
import Signals from './pages/Signals';
import Ocultas from './pages/Ocultas';
import NotFound from './pages/NotFound';
import './App.css'

function App() {

  return (
    <Router>
      <Header />
      {/* Añadimos padding-top para que el contenido no se solape con el Header fijo */}
      <main className="pt-[82px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/the-vault" element={<TheVault />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/signals" element={<Signals />} />
          <Route path="/ocultas" element={<Ocultas />} />
          <Route path="*" element={<NotFound />} /> {/*Esto sería para las rutas de errores*/}
        </Routes>
      </main>
    </Router>
  )
}

export default App;
