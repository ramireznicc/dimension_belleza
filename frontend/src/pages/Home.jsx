import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Scissors, Sparkles, Heart, Zap, ChevronDown, CalendarDays } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';

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

const SLIDE_INTERVAL = 4500;

function RecomendacionCarousel() {
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = 4;
  const touchStartX = useRef(null);

  const go = (next) => {
    setDirection(next > current || (current === total - 1 && next === 0) ? 1 : -1);
    setCurrent(next);
    setProgressKey((k) => k + 1);
  };

  const prev = () => go((current - 1 + total) % total);
  const next = () => go((current + 1) % total);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % total);
      setProgressKey((k) => k + 1);
    }, SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full" style={{ maxWidth: '420px' }}>
        <div>
          {/* Imagen animada */}
          <div
            className="overflow-hidden relative"
            style={{ minHeight: 140 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={current}
                src={`/recomendaciones/recomendacion${current + 1}.png`}
                alt={`Recomendación ${current + 1}`}
                className="w-full h-auto block rounded-2xl"
                style={{ filter: 'drop-shadow(0 8px 24px rgba(255,45,160,0.15)) drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>

          {/* Barra de progreso */}
          <div className="mx-4 mt-3 mb-3 rounded-full overflow-hidden" style={{ height: '2px', background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              key={progressKey}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #ff2da0, #c026d3)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
            />
          </div>

          {/* Navegación: flechas + dots */}
          <div className="flex items-center justify-between px-4 pb-3">
            <button
              onClick={prev}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'rgba(255,45,160,0.1)', border: '1px solid rgba(255,45,160,0.2)', color: '#ff2da0' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            <div className="flex gap-1.5">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '14px' : '5px',
                    height: '5px',
                    background: i === current ? '#ff2da0' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'rgba(255,45,160,0.1)', border: '1px solid rgba(255,45,160,0.2)', color: '#ff2da0' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3 slots visibles, 5 imágenes rotan por ellos
const SLOTS = [
  { top: 0,   left: 0,   width: 250, rotate: -3,   zIndex: 1, ratio: '4/3' },
  { top: 30,  left: 148, width: 215, rotate: 2.5,  zIndex: 2, ratio: '3/4' },
  { top: 195, left: 55,  width: 200, rotate: -1.5, zIndex: 3, ratio: '3/4' },
];

const SRCS = [
  '/quienes-somos/profile2.jpeg',
  '/quienes-somos/lore1.jpeg',
  '/quienes-somos/inicio-extra1.jpeg',
  '/quienes-somos/inicio-alisado1.jpeg',
  '/quienes-somos/inicio-coloracion1.jpeg',
];

const TOTAL = SRCS.length;

function PhotoCollage() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setOffset((o) => (o + 1) % TOTAL), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 400, height: 500 }}>
      {SRCS.map((src, i) => {
        const slotIdx = (i - offset + TOTAL) % TOTAL;
        const visible = slotIdx < 3;
        const slot = SLOTS[slotIdx] ?? SLOTS[0];
        const isFront = slotIdx === 2;
        return (
          <motion.div
            key={i}
            className="absolute rounded-2xl overflow-hidden"
            animate={{
              top: slot.top,
              left: slot.left,
              width: slot.width,
              rotate: slot.rotate,
              zIndex: visible ? slot.zIndex : 0,
              scale: isFront ? 1.06 : visible ? 1 : 0.85,
              opacity: visible ? 1 : 0,
              boxShadow: isFront
                ? '0 16px 48px rgba(255,45,160,0.3), 0 0 70px rgba(192,38,211,0.15)'
                : '0 6px 24px rgba(255,45,160,0.1), 0 0 30px rgba(192,38,211,0.05)',
            }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              border: isFront ? '1px solid rgba(255,45,160,0.4)' : '1px solid rgba(255,45,160,0.15)',
              pointerEvents: visible ? 'auto' : 'none',
            }}
          >
            <img src={src} alt="" className="w-full object-cover object-top" style={{ aspectRatio: slot.ratio }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(192,38,211,0.15) 0%, transparent 55%)' }} />
          </motion.div>
        );
      })}
    </div>
  );
}

function CollapseGroup({ title, items }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const expanded = !isMobile || open;

  return (
    <div>
      <button
        className="w-full flex items-center justify-between py-3 px-4 rounded-xl mb-2 sm:hidden transition-all"
        style={{
          background: open ? 'rgba(255,45,160,0.1)' : 'rgba(255,45,160,0.05)',
          border: '1px solid rgba(255,45,160,0.2)',
        }}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-base font-semibold font-heading" style={{ color: 'rgba(255,45,160,0.9)' }}>
          {title}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
          <ChevronDown size={16} style={{ color: 'rgba(255,45,160,0.7)' }} />
        </motion.span>
      </button>

      <p className="hidden sm:block text-base font-semibold mb-3 font-heading" style={{ color: 'rgba(255,45,160,0.85)' }}>
        {title}
      </p>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            className="flex flex-col gap-2 mb-1 sm:mb-0"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            {items.map(({ label, id }) => (
              <li key={id}>
                <Link
                  to={`/servicios?filtro=${id}`}
                  className="flex items-center gap-2 py-2.5 px-4 rounded-xl text-sm transition-all"
                  style={{ background: 'rgba(255,45,160,0.06)', border: '1px solid rgba(255,45,160,0.12)', color: 'rgba(226,217,243,0.75)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,45,160,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,45,160,0.3)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,45,160,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,45,160,0.12)'; }}
                >
                  <span style={{ color: '#ff2da0', fontSize: '0.6rem', flexShrink: 0 }}>✦</span>
                  {label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

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
          <div className="flex flex-col lg:flex-row gap-10 items-center">

            {/* ── Fotos collage desestructurado ── */}
            <motion.div
              className="w-full lg:w-2/5 shrink-0"
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <PhotoCollage />
            </motion.div>

            {/* ── Texto ── */}
            <motion.div
              className="flex-1 flex flex-col gap-4"
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              {/* Descripción */}
              <div className="space-card p-4">
                <p className="leading-relaxed text-sm md:text-base" style={{ color: 'rgba(226,217,243,0.75)' }}>
                  Un espacio holístico donde la estética y la energía se encuentran para transformar
                  tu imagen y tu bienestar.
                </p>
              </div>

              {/* Servicios destacados */}
              <div className="space-card p-4">
                <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: 'rgba(226,217,243,0.4)' }}>
                  Cada servicio es una experiencia
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {categorias.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <li
                        key={cat.titulo}
                        className="flex items-start gap-3 py-2 px-3 rounded-xl"
                        style={{ background: 'rgba(255,45,160,0.06)', border: '1px solid rgba(255,45,160,0.12)' }}
                      >
                        <div
                          className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5"
                          style={{ background: 'linear-gradient(135deg, rgba(255,45,160,0.2), rgba(192,38,211,0.15))', border: '1px solid rgba(255,45,160,0.2)' }}
                        >
                          <Icon size={13} style={{ color: '#ff82c5' }} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold font-heading" style={{ color: '#e2d9f3' }}>{cat.titulo}</p>
                          <p className="text-xs leading-snug mt-0.5" style={{ color: 'rgba(226,217,243,0.5)' }}>{cat.descripcion}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Filosofía */}
              <div
                className="rounded-2xl p-4 text-center"
                style={{ background: 'linear-gradient(135deg, rgba(255,45,160,0.07), rgba(192,38,211,0.06))', border: '1px solid rgba(192,38,211,0.18)' }}
              >
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(226,217,243,0.65)' }}>
                  Cada visita es un momento para reconectar con vos, renovar tu energía y realzar tu esencia.
                </p>
                <p
                  className="font-heading text-base font-semibold mb-4"
                  style={{ background: 'linear-gradient(90deg, #ff2da0, #c026d3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  Entrá en una nueva dimensión de vos.
                </p>
                <a
                  href="#nuestros-servicios"
                  className="btn-neon inline-flex items-center gap-2 text-sm"
                >
                  Todos los servicios <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      <hr className="star-divider" />

      {/* ── Servicios ── */}
      <section id="nuestros-servicios" className="relative py-20 px-4">
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
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4 }}
          >
            <CollapseGroup
              title="Peluquería consciente"
              items={[
                { label: 'Coloración',             id: 'coloracion' },
                { label: 'Cortes y peinados',      id: 'cortes-peinados' },
                { label: 'Tratamientos capilares', id: 'tratamientos-capilares' },
              ]}
            />
            <CollapseGroup
              title="Tratamientos de bienestar"
              items={[
                { label: 'Masajes y Reiki',         id: 'masaje-reiki' },
                { label: 'Depilación láser',        id: 'depilacion-laser' },
                { label: 'Tratamientos reductores', id: 'reductores' },
                { label: 'Limpieza facial',         id: 'limpieza-facial' },
                { label: 'Radiofrecuencia',         id: 'radiofrecuencia' },
                { label: 'Cavitación',              id: 'cavitacion' },
                { label: 'Ondas rusas',             id: 'ondas-rusas' },
              ]}
            />
          </motion.div>
        </div>
      </section>

      <hr className="star-divider" />

      {/* ── Testimonios estilo Instagram ── */}
      <section className="section-indigo py-16 px-4 flex-1">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-3 font-heading">
              <span className="gradient-text">Resultados que transforman</span>
            </h2>
            <div className="flex justify-center mb-3">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #ff2da0, #c026d3, transparent)', boxShadow: '0 0 8px rgba(255,45,160,0.5)' }} />
            </div>
            <p style={{ color: 'rgba(226,217,243,0.5)' }}>Reseñas reales de nuestras clientas</p>
          </motion.div>

          {/* Carrusel uno por uno */}
          <RecomendacionCarousel />
        </div>
      </section>
    </div>
  );
}
