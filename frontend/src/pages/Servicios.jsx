import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categorias } from '../data/servicios';
import { mergeWithOverrides } from '../utils/serviciosStorage';
import ServicioCard from '../components/ServicioCard';
import { Info, ChevronDown } from 'lucide-react';

function CategoriaSection({ categoria, globalIndex }) {
  const [open, setOpen] = useState(false);

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
          style={{
            textShadow: '0 0 32px rgba(255,45,160,0.25)',
          }}
        >
          {categoria.titulo}
        </h2>
        <div
          className="flex-1 h-px"
          style={{ background: 'linear-gradient(90deg, rgba(255,45,160,0.4), rgba(192,38,211,0.2), transparent)' }}
        />
      </div>

      {/* Grilla de cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-40px' }}
      >
        {categoria.servicios.map((s, i) => (
          <ServicioCard key={s.id} servicio={s} index={globalIndex + i} />
        ))}
      </motion.div>

      {/* Aclaración (si la hay) */}
      {categoria.aclaracion && (
        <div className="mt-6">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 text-sm font-semibold transition-all"
            style={{ color: 'rgba(192,132,252,0.7)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#c084fc')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(192,132,252,0.7)')}
          >
            <Info size={14} />
            Aclaración importante
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={14} />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p
                  className="mt-3 text-sm leading-relaxed p-4 rounded-xl"
                  style={{
                    color: 'rgba(226,217,243,0.55)',
                    background: 'rgba(67,20,140,0.12)',
                    border: '1px solid rgba(192,38,211,0.15)',
                  }}
                >
                  {categoria.aclaracion}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.section>
  );
}

const ALL = 'todos';

export default function Servicios() {
  const [filtro, setFiltro] = useState(ALL);
  const categoriasActivas = useMemo(() => mergeWithOverrides(categorias), []);

  const offsets = categoriasActivas.reduce((acc, cat, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + categoriasActivas[i - 1].servicios.length);
    return acc;
  }, []);

  const visibles = filtro === ALL
    ? categoriasActivas
    : categoriasActivas.filter((c) => c.id === filtro);

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

          {/* Chips de filtro */}
          <motion.div
            className="flex gap-2.5 mb-14 overflow-x-auto pb-1 px-1 justify-start md:justify-center md:flex-wrap no-scrollbar"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
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
                      layoutId="chip-active"
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ background: 'rgba(255,45,160,0.08)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {cat.titulo}
                </button>
              );
            })}
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
