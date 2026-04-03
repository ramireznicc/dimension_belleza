import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';

const gradients = [
  'linear-gradient(160deg, #3b0764 0%, #6d28d9 50%, #be185d 100%)',
  'linear-gradient(160deg, #1e1b4b 0%, #7c3aed 50%, #db2777 100%)',
  'linear-gradient(160deg, #4a044e 0%, #a21caf 50%, #9333ea 100%)',
  'linear-gradient(160deg, #0f172a 0%, #4f46e5 50%, #ec4899 100%)',
];

export default function HoverExpandServices({ servicios }) {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* Desktop: hover expand */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="hidden md:flex w-full items-center justify-center gap-2"
        style={{ height: '26rem' }}
      >
        {servicios.map((servicio, index) => (
          <motion.div
            key={servicio.id}
            className="relative cursor-pointer overflow-hidden"
            style={{ borderRadius: '20px', flexShrink: 0 }}
            animate={{
              width: active === index ? '22rem' : '5rem',
              height: '26rem',
            }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            onHoverStart={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            {/* Fondo degradado */}
            <div
              className="absolute inset-0"
              style={{ background: gradients[index % gradients.length] }}
            />

            {/* Overlay oscuro base */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(2,2,8,0.35)' }}
            />

            {/* Destellos decorativos */}
            <div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,45,160,0.25) 0%, transparent 70%)',
              }}
            />

            {/* Contenido colapsado: solo ícono vertical */}
            <AnimatePresence>
              {active !== index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                >
                  <span className="text-3xl">{servicio.icon}</span>
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      transform: 'rotate(180deg)',
                    }}
                  >
                    {servicio.titulo}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contenido expandido */}
            <AnimatePresence>
              {active === index && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                  className="absolute inset-0 flex flex-col justify-end p-6"
                  style={{ minWidth: '22rem' }}
                >
                  <span className="text-4xl mb-3">{servicio.icon}</span>
                  <h3
                    className="text-xl font-medium mb-1 font-heading"
                    style={{
                      color: '#fff',
                      textShadow: '0 0 20px rgba(255,45,160,0.5)',
                    }}
                  >
                    {servicio.titulo}
                  </h3>
                  <p
                    className="text-xs leading-relaxed mb-4"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {servicio.descripcion}
                  </p>
                  <ul className="space-y-1.5">
                    {servicio.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs"
                        style={{ color: 'rgba(255,255,255,0.8)' }}
                      >
                        <Check size={12} style={{ color: '#ff2da0', flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Línea decorativa inferior */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #ff2da0, transparent)',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile: grid normal */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
        {servicios.map((s, i) => (
          <div
            key={s.id}
            className="space-card overflow-hidden"
          >
            <div
              className="p-5 flex items-center gap-3"
              style={{
                background: gradients[i % gradients.length],
                borderBottom: '1px solid rgba(255,45,160,0.15)',
              }}
            >
              <span className="text-4xl">{s.icon}</span>
              <h3 className="text-lg font-medium font-heading text-white">{s.titulo}</h3>
            </div>
            <div className="p-5">
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(226,217,243,0.6)' }}>
                {s.descripcion}
              </p>
              <ul className="space-y-1.5">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(226,217,243,0.75)' }}>
                    <Check size={13} style={{ color: '#ff2da0', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
