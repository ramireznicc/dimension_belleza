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

      {/* ── Quiénes Somos ── */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Nebula blobs de fondo */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ top: '15%', right: '4%', width: 300, height: 220, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(192,38,211,0.13) 0%, transparent 70%)', filter: 'blur(48px)' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute pointer-events-none"
          style={{ bottom: '10%', left: '3%', width: 240, height: 180, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,45,160,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />

        <div className="max-w-5xl mx-auto relative">
          {/* Encabezado */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-3 font-heading">
              <span className="gradient-text">Quiénes Somos</span>
            </h2>
            <div className="flex justify-center mb-4">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #ff2da0, #c026d3, transparent)', boxShadow: '0 0 8px rgba(255,45,160,0.5)' }} />
            </div>
            <p className="text-xl md:text-2xl font-heading" style={{ color: '#e2d9f3' }}>
              Bienvenidos a Dimensión Belleza
            </p>
          </motion.div>

          {/* Layout: fotos + texto */}
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* ── Fotos ── */}
            <motion.div
              className="w-full lg:w-2/5 shrink-0 flex flex-col gap-4"
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Imagen principal (profile2) */}
              <div
                className="relative rounded-2xl overflow-hidden w-full"
                style={{ boxShadow: '0 0 30px rgba(255,45,160,0.2), 0 0 60px rgba(192,38,211,0.1)', border: '1px solid rgba(255,45,160,0.2)' }}
              >
                <img
                  src="/profile2.jpeg"
                  alt="Florencia Montenegro"
                  className="w-full object-cover object-top"
                  style={{ aspectRatio: '4/3' }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(192,38,211,0.18) 0%, transparent 50%)' }}
                />
                {/* Badge nombre */}
                <div
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl text-center whitespace-nowrap"
                  style={{ background: 'rgba(10,5,20,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,45,160,0.25)' }}
                >
                  <p className="font-semibold font-heading text-sm" style={{ color: '#e2d9f3' }}>Florencia Montenegro</p>
                  <p className="text-xs" style={{ color: 'rgba(255,45,160,0.85)' }}>Estilista &amp; Reikista</p>
                </div>
              </div>

              {/* Imagen secundaria (profile1) — más chica, centrada */}
              <div className="flex justify-center">
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{ width: '65%', boxShadow: '0 0 24px rgba(255,45,160,0.18), 0 0 48px rgba(192,38,211,0.08)', border: '1px solid rgba(192,38,211,0.25)' }}
                >
                  <img
                    src="/profile1.jpeg"
                    alt="Florencia Montenegro"
                    className="w-full object-cover object-top"
                    style={{ aspectRatio: '3/4' }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(255,45,160,0.15) 0%, transparent 50%)' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* ── Texto ── */}
            <motion.div
              className="flex-1 flex flex-col gap-6"
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              {/* Descripción */}
              <div className="space-card p-6">
                <p className="leading-relaxed text-base md:text-lg" style={{ color: 'rgba(226,217,243,0.75)' }}>
                  Dimensión Belleza es un espacio holístico integral donde la estética y la energía se
                  encuentran para transformar no solo tu imagen, sino también tu bienestar.
                </p>
              </div>

              {/* Servicios destacados */}
              <div className="space-card p-6">
                <p className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: 'rgba(226,217,243,0.4)' }}>
                  Cada servicio es una experiencia
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Peluquería consciente',
                    'Reiki',
                    'Masajes',
                    'Tratamientos integrales de bienestar',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm py-2 px-4 rounded-xl"
                      style={{ background: 'rgba(255,45,160,0.06)', border: '1px solid rgba(255,45,160,0.12)', color: 'rgba(226,217,243,0.75)' }}
                    >
                      <span style={{ color: '#ff2da0', fontSize: '0.65rem' }}>✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Filosofía */}
              <div
                className="rounded-2xl p-5 md:p-6 text-center"
                style={{ background: 'linear-gradient(135deg, rgba(255,45,160,0.07), rgba(192,38,211,0.06))', border: '1px solid rgba(192,38,211,0.18)' }}
              >
                <p className="leading-relaxed mb-3 text-sm md:text-base" style={{ color: 'rgba(226,217,243,0.7)' }}>
                  Creemos que la belleza verdadera nace cuando cuerpo, mente y espíritu están en armonía.
                  Por eso, cada visita es un momento para reconectar con vos, renovar tu energía y realzar tu esencia.
                </p>
                <p className="text-sm mb-4" style={{ color: 'rgba(226,217,243,0.5)' }}>
                  No venís solo a cambiar tu look…<br />
                  Venís a regalarte un espacio para sentirte bien, por dentro y por fuera.
                </p>
                <p
                  className="font-heading text-lg font-semibold"
                  style={{ background: 'linear-gradient(90deg, #ff2da0, #c026d3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  Entrá en una nueva dimensión de vos.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── Separador interno ── */}
          <div className="flex items-center gap-4 my-14">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(192,38,211,0.25))' }} />
            <span style={{ color: 'rgba(255,45,160,0.4)', fontSize: '0.65rem' }}>✦</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(192,38,211,0.25), transparent)' }} />
          </div>

          {/* ── Lorena Montenegro ── */}
          <div className="flex flex-col lg:flex-row-reverse gap-10 items-start">

            {/* ── Fotos Romina ── */}
            <motion.div
              className="w-full lg:w-2/5 shrink-0"
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative flex gap-3 items-end">
                {/* Imagen principal (romi2 — trabajando con el láser) */}
                <div
                  className="relative rounded-2xl overflow-hidden flex-1"
                  style={{ boxShadow: '0 0 30px rgba(192,38,211,0.2), 0 0 60px rgba(255,45,160,0.08)', border: '1px solid rgba(192,38,211,0.22)' }}
                >
                  <img
                    src="/lore1.jpeg"
                    alt="Lorena Montenegro"
                    className="w-full object-cover object-top"
                    style={{ aspectRatio: '3/4' }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(192,38,211,0.18) 0%, transparent 50%)' }}
                  />
                </div>


{/* Badge nombre */}
                <div
                  className="absolute bottom-0 left-0 right-0 mx-auto w-fit px-4 py-2 rounded-xl text-center"
                  style={{ background: 'rgba(10,5,20,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(192,38,211,0.3)' }}
                >
                  <p className="font-semibold font-heading text-sm" style={{ color: '#e2d9f3' }}>Lorena Montenegro</p>
                  <p className="text-xs" style={{ color: 'rgba(192,38,211,0.9)' }}>Esteticista &amp; Depilación Láser</p>
                </div>
              </div>
            </motion.div>

            {/* ── Texto Romina ── */}
            <motion.div
              className="flex-1 flex flex-col gap-6"
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              {/* Nombre y rol */}
              <div className="space-card p-6 flex items-center gap-4">
                <div
                  className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg"
                  style={{ background: 'linear-gradient(135deg, rgba(192,38,211,0.25), rgba(255,45,160,0.15))', border: '1px solid rgba(192,38,211,0.35)' }}
                >
                  ✦
                </div>
                <div>
                  <p className="font-semibold font-heading text-lg" style={{ color: '#e2d9f3' }}>Lorena Montenegro</p>
                  <p className="text-sm" style={{ color: 'rgba(192,38,211,0.9)' }}>Esteticista &amp; Especialista en Depilación Láser</p>
                </div>
              </div>

              {/* Descripción */}
              <div className="space-card p-6">
                <p className="leading-relaxed text-base md:text-lg" style={{ color: 'rgba(226,217,243,0.75)' }}>
                  Lorena se especializa en tratamientos estéticos y depilación láser de última tecnología,
                  brindando resultados definitivos con el máximo cuidado y profesionalismo.
                </p>
              </div>

              {/* Especialidades */}
              <div className="space-card p-6">
                <p className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: 'rgba(226,217,243,0.4)' }}>
                  Especialidades
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Depilación láser',
                    'Tratamientos reductores',
                    'Maderoterapia',
                    'Limpieza facial',
                    'Radiofrecuencia',
                    'Cavitación',
                    'Ondas rusas',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm py-2 px-4 rounded-xl"
                      style={{ background: 'rgba(192,38,211,0.06)', border: '1px solid rgba(192,38,211,0.14)', color: 'rgba(226,217,243,0.75)' }}
                    >
                      <span style={{ color: '#c026d3', fontSize: '0.65rem' }}>✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

        </div>
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
