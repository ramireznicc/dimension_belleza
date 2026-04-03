import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicios } from '../data/servicios';
import { ArrowRight } from 'lucide-react';
import HoverExpandServices from '../components/HoverExpandServices';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Servicios() {
  return (
    <div className="flex flex-col flex-1">
      {/* Header + tarjetas — tinte púrpura */}
      <section className="section-purple py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading">
              <span className="gradient-text">Servicios</span>
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(226,217,243,0.55)' }}>
              Tratamientos profesionales personalizados para realzar tu belleza natural.
            </p>
          </motion.div>

          <HoverExpandServices servicios={servicios} />
        </div>
      </section>

      <hr className="star-divider" />

      {/* CTA — tinte rosa */}
      <section className="section-pink py-16 px-4 flex-1">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeUp(0.1)}
            className="text-center space-card p-10"
            style={{
              background: 'rgba(255,45,160,0.06)',
              border: '1px solid rgba(255,45,160,0.2)',
            }}
          >
            <h3 className="text-2xl font-bold mb-3 font-heading" style={{ color: '#e2d9f3' }}>
              ¿Querés saber más o reservar un turno?
            </h3>
            <p className="mb-6" style={{ color: 'rgba(226,217,243,0.5)' }}>
              Consultanos sin compromiso por WhatsApp o redes sociales.
            </p>
            <Link to="/contacto" className="btn-neon">
              Contactar ahora <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
