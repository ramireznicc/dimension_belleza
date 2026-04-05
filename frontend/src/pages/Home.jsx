import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Scissors, Sparkles, Heart, Zap, ChevronDown, CalendarDays } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import InstagramTestimonials from '../components/InstagramTestimonials';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
});

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const categorias = [
  {
    icon: Scissors,
    titulo: 'Estilismo',
    descripcion: 'Corte, coloración, mechas, alisados y tratamientos capilares a medida.',
  },
  {
    icon: Sparkles,
    titulo: 'Estética Facial',
    descripcion: 'Limpiezas, hidratación, microdermoabrasión y tratamientos antiedad.',
  },
  {
    icon: Heart,
    titulo: 'Estética Corporal',
    descripcion: 'Masajes, drenajes linfáticos, cavitación y tratamientos reductores.',
  },
  {
    icon: Zap,
    titulo: 'Depilación Láser',
    descripcion: 'Tecnología de última generación para resultados definitivos y sin dolor.',
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="flex flex-col flex-1">
      {/* ── Hero ── */}
      <section className="section-purple relative overflow-hidden py-24 px-4 text-center">

        {/* Nebula blobs */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ top: '10%', left: '8%', width: 340, height: 220, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(192,38,211,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute pointer-events-none"
          style={{ bottom: '12%', right: '6%', width: 280, height: 200, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,45,160,0.14) 0%, transparent 70%)', filter: 'blur(50px)' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.95, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Estrellas fugaces — solo en el hero */}
        {[
          { top: '12%', delay: 2,   repeatDelay: 10, width: 130 },
          { top: '45%', delay: 6,   repeatDelay: 12, width: 100 },
          { top: '28%', delay: 10,  repeatDelay: 9,  width: 150 },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              top: s.top,
              left: '-10%',
              width: s.width,
              height: '1.5px',
              borderRadius: '999px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,45,160,0.3) 30%, rgba(255,220,245,0.95) 75%, white 90%, transparent 100%)',
              zIndex: 2,
            }}
            animate={{
              x: ['0px', '120vw'],
              y: ['0px', '80px'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.8,
              delay: s.delay,
              repeat: Infinity,
              repeatDelay: s.repeatDelay,
              ease: 'easeIn',
              times: [0, 0.06, 0.82, 1],
            }}
          />
        ))}

        <div className="relative max-w-4xl mx-auto">
          <motion.div {...fadeUp(0)} className="flex flex-col items-center gap-4 mb-8">

            {/* Logo con glow animado */}
            <motion.img
              src="/dimension_belleza_LOGO.svg"
              alt="Dimensión Belleza"
              className="w-64 md:w-80 lg:w-96"
              animate={{
                filter: [
                  'drop-shadow(0 0 20px rgba(255,45,160,0.35)) drop-shadow(0 0 44px rgba(192,38,211,0.18))',
                  'drop-shadow(0 0 32px rgba(255,45,160,0.6)) drop-shadow(0 0 64px rgba(192,38,211,0.35))',
                  'drop-shadow(0 0 20px rgba(255,45,160,0.35)) drop-shadow(0 0 44px rgba(192,38,211,0.18))',
                ],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Texto con shimmer */}
            <h1
              className="hero-title-shimmer text-5xl md:text-6xl leading-none"
              style={{ fontFamily: "'Poiret One', cursive", fontWeight: 700, WebkitTextStroke: '0.5px rgba(255,255,255,0.15)' }}
            >
              Dimensión Belleza
            </h1>
          </motion.div>

          <motion.p
            {...fadeUp(0.15)}
            className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'rgba(226,217,243,0.65)' }}
          >
            Estilismo, Estética Corporal &amp; Facial y Depilación Láser.
            Transformá tu imagen con profesionalismo y dedicación.
          </motion.p>

          <motion.div {...fadeUp(0.25)} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/servicios" className="btn-neon">
              Ver servicios <ArrowRight size={18} />
            </Link>
            <a
              href="https://wa.me/543413080131?text=Hola!%20Quisiera%20sacar%20un%20turno."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center gap-2"
            >
              <CalendarDays size={17} />
              Sacar turno
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <AnimatePresence>
          {!scrolled && (
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown size={22} style={{ color: 'rgba(255,45,160,0.45)' }} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <hr className="star-divider" />

      {/* ── Servicios ── */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-3 font-heading">
              <span className="gradient-text">Nuestros Servicios</span>
            </h2>
            <div className="flex justify-center mb-3">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #ff2da0, #c026d3, transparent)', boxShadow: '0 0 8px rgba(255,45,160,0.5)' }} />
            </div>
            <p style={{ color: 'rgba(226,217,243,0.5)' }}>Todo lo que necesitás en un solo lugar</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
          >
            {categorias.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.titulo}
                  variants={cardVariant}
                  className="space-card p-6 flex items-start gap-4"
                >
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(255,45,160,0.2), rgba(192,38,211,0.15))', border: '1px solid rgba(255,45,160,0.2)' }}
                  >
                    <Icon size={18} style={{ color: '#ff82c5' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 font-heading" style={{ color: '#e2d9f3' }}>{cat.titulo}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,217,243,0.5)' }}>
                      {cat.descripcion}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="text-center mt-10">
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all"
              style={{ color: '#ff2da0' }}
            >
              Ver todos los servicios <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <hr className="star-divider" />

      {/* ── Testimonios estilo Instagram ── */}
      <section className="section-indigo py-16 px-4 flex-1">
        <div className="max-w-xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-3 font-heading">
              <span className="gradient-text">Lo que dicen</span>
            </h2>
            <div className="flex justify-center mb-3">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #ff2da0, #c026d3, transparent)', boxShadow: '0 0 8px rgba(255,45,160,0.5)' }} />
            </div>
            <p style={{ color: 'rgba(226,217,243,0.5)' }}>Reseñas reales de nuestras clientas</p>
          </motion.div>
          <InstagramTestimonials />
        </div>
      </section>
    </div>
  );
}
