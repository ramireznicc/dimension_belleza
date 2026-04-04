import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StarField from './components/StarField';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';

function AppRoutes() {
  const location = useLocation();
  return (
    <PageTransition>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </PageTransition>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative">
        <StarField count={130} />
        <Navbar />
        <main className="flex-1 relative z-10 flex flex-col">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
