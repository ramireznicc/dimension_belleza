import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StarField from './components/StarField';
import PageTransition from './components/PageTransition';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

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
      <ScrollToTop />
      <div className="min-h-screen flex flex-col relative">
        <StarField count={130} />
        <Navbar />
        <main className="flex-1 relative z-10 flex flex-col">
          <AppRoutes />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}

export default App;
