import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { categorias } from '../data/servicios';
import { mergeWithOverrides } from '../utils/serviciosStorage';
import ServicioCard from '../components/ServicioCard';
import { Info, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { createPortal } from 'react-dom';

function MobileFiltroMenu({ categorias, filtro, setFiltro, ALL }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const todas = [{ id: ALL, titulo: 'Todos' }, ...categorias];
  const seleccionada = todas.find((c) => c.id === filtro)?.titulo ?? 'Todos';

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="relative md:hidden" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3 rounded-2xl text-sm font-semibold transition-all"
        style={{
          background: 'rgba(255,45,160,0.08)',
          border: '1px solid rgba(255,45,160,0.3)',
          color: '#ff82c5',
        }}
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={14} />
          {seleccionada}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-20"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'rgba(10,5,30,0.97)',
              border: '1px solid rgba(255,45,160,0.2)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
            }}
          >
            {todas.map((cat) => {
              const active = filtro === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setFiltro(cat.id); setOpen(false); }}
                  className="w-full flex items-center justify-between px-5 py-3 text-sm transition-all"
                  style={{
                    color: active ? '#ff82c5' : 'rgba(226,217,243,0.65)',
                    background: active ? 'rgba(255,45,160,0.1)' : 'transparent',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {cat.titulo}
                  {active && <span style={{ color: '#ff2da0', fontSize: '0.55rem' }}>✦</span>}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AclaracionModal({ texto, onClose }) {
  return createPortal(
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{ background: 'rgba(2,2,8,0.85)', backdropFilter: 'blur(12px)' }}
    >
      <motion.div
        className="relative w-full max-w-lg rounded-2xl p-6"
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'rgba(10,5,30,0.97)',
          border: '1px solid rgba(192,38,211,0.25)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Info size={15} style={{ color: 'rgba(192,132,252,0.8)', flexShrink: 0 }} />
          <h3 className="font-semibold font-heading text-sm" style={{ color: 'rgba(192,132,252,0.9)' }}>
            Aclaración importante
          </h3>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,217,243,0.65)' }}>
          {texto}
        </p>
        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: 'rgba(192,38,211,0.12)',
            border: '1px solid rgba(192,38,211,0.2)',
            color: 'rgba(192,132,252,0.8)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(192,38,211,0.2)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(192,38,211,0.12)'; }}
        >
          Entendido
        </button>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function CategoriaSection({ categoria, globalIndex }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <motion.section
      key={categoria.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Encabezado de categoría */}
      <div className="flex items-center gap-4 mb-8">
        <h2
          className="text-3xl md:text-4xl font-medium font-heading whitespace-nowrap gradient-text"
          style={{ textShadow: '0 0 32px rgba(255,45,160,0.25)' }}
        >
          {categoria.titulo}
        </h2>
        <div
          className="flex-1 h-px"
          style={{ background: 'linear-gradient(90deg, rgba(255,45,160,0.4), rgba(192,38,211,0.2), transparent)' }}
        />
        {categoria.aclaracion && (
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer"
            style={{
              background: 'rgba(255,45,160,0.12)',
              border: '1px solid rgba(255,45,160,0.4)',
              color: '#ff82c5',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,45,160,0.22)'; e.currentTarget.style.borderColor = 'rgba(255,45,160,0.7)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,45,160,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,45,160,0.4)'; e.currentTarget.style.color = '#ff82c5'; }}
          >
            <Info size={12} />
            Importante
          </button>
        )}
      </div>

      <AnimatePresence>
        {modalOpen && <AclaracionModal texto={categoria.aclaracion} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>

      {/* Grilla de cards */}
      <motion.div
        className="grid grid-cols-3 lg:grid-cols-4 gap-3"
        variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-40px' }}
      >
        {categoria.servicios.map((s, i) => (
          <ServicioCard key={s.id} servicio={s} index={globalIndex + i} />
        ))}
      </motion.div>
    </motion.section>
  );
}

const ALL = 'todos';

export default function Servicios() {
  const [searchParams] = useSearchParams();
  const [filtro, setFiltro] = useState(() => searchParams.get('filtro') ?? ALL);
  const categoriasActivas = useMemo(() => mergeWithOverrides(categorias), []);

  useEffect(() => {
    const f = searchParams.get('filtro');
    if (f) setFiltro(f);
  }, [searchParams]);

  const offsets = categoriasActivas.reduce((acc, cat, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + categoriasActivas[i - 1].servicios.length);
    return acc;
  }, []);

  const visibles = (filtro === ALL
    ? categoriasActivas
    : categoriasActivas.filter((c) => c.id === filtro)
  ).filter((c) => c.servicios.length > 0);

  return (
    <div className="flex flex-col flex-1">
      <section className="section-purple py-16 px-4 flex-1">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-medium mb-3 font-heading">
              <span className="gradient-text">Servicios</span>
            </h1>
            <div className="flex justify-center mb-4">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #ff2da0, #c026d3, transparent)', boxShadow: '0 0 8px rgba(255,45,160,0.5)' }} />
            </div>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(226,217,243,0.55)' }}>
              Tratamientos profesionales personalizados para realzar tu belleza.
            </p>
          </motion.div>

          {/* Chips de filtro — desktop: fila, mobile: menú plegable */}
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {/* ── Mobile: botón "Filtrar" + dropdown ── */}
            <MobileFiltroMenu
              categorias={categoriasActivas}
              filtro={filtro}
              setFiltro={setFiltro}
              ALL={ALL}
            />

            {/* ── Desktop (md+): chips horizontales ── */}
            <div className="hidden md:flex gap-2.5 pb-1 px-1 justify-center flex-wrap">
              {[{ id: ALL, titulo: 'Todos' }, ...categoriasActivas].map((cat) => {
                const active = filtro === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFiltro(cat.id)}
                    className="relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer shrink-0"
                    style={{
                      background: active
                        ? 'linear-gradient(135deg, rgba(255,45,160,0.25), rgba(192,38,211,0.2))'
                        : 'rgba(255,255,255,0.05)',
                      border: active
                        ? '1px solid rgba(255,45,160,0.55)'
                        : '1px solid rgba(255,255,255,0.1)',
                      color: active ? '#ff82c5' : 'rgba(226,217,243,0.55)',
                      boxShadow: active ? '0 0 16px rgba(255,45,160,0.2)' : 'none',
                    }}
                  >
                    {active && (
                      <motion.span
                        layoutId="chip-active-desktop"
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{ background: 'rgba(255,45,160,0.08)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {cat.titulo}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Secciones */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filtro}
              className="flex flex-col gap-16"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {visibles.map((cat) => {
                const globalIndex = offsets[categoriasActivas.indexOf(cat)];
                return (
                  <CategoriaSection key={cat.id} categoria={cat} globalIndex={globalIndex} />
                );
              })}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>
    </div>
  );
}
