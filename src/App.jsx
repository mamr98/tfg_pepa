import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './Pages/Home';
import Tienda from './Pages/Tienda';
import TheVault from './Pages/TheVault';
import Lookbook from './Pages/Lookbook';
import Signals from './Pages/Signals';
import Ocultas from './Pages/Ocultas';
import NotFound from './Pages/NotFound';
import './App.css'

function App() {

  return (
    <Router>
      <Header />
      {/* Añadimos padding-top para que el contenido no se solape con el Header fijo */}
      <main className="pt-[82px]">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Assuming Home.jsx is in src/Pages/ */}
          <Route path="/tienda" element={<Tienda />} /> {/* Assuming Tienda.jsx is in src/Pages/ */}
          <Route path="/the-vault" element={<TheVault />} /> {/* Assuming TheVault.jsx is in src/Pages/ */}
          <Route path="/lookbook" element={<Lookbook />} /> {/* Assuming Lookbook.jsx is in src/Pages/ */}
          <Route path="/signals" element={<Signals />} /> {/* Assuming Signals.jsx is in src/Pages/ */}
          <Route path="/ocultas" element={<Ocultas />} /> {/* Assuming Ocultas.jsx is in src/Pages/ */}
          <Route path="*" element={<NotFound />} /> {/* Assuming NotFound.jsx is in src/Pages/ */}
        </Routes>
      </main>
    </Router>
  )
}

export default App;
