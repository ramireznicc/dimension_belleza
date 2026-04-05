import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

const WA_NUMBER = '543413080131';

export default function ServicioCard({ servicio, index = 0 }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hola! Me gustaría consultar sobre el servicio de ${servicio.titulo} y reservar un turno.`
  )}`;

  return (
    <>
      <motion.article
        className="group relative overflow-hidden rounded-2xl flex flex-col cursor-pointer"
        onClick={() => setOpen(true)}
        variants={{
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
        }}
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
        }}
      >
        {/* ── Imagen ── */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
          <img
            src={servicio.imagen}
            alt={servicio.titulo}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
            style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
          />

          {/* Vignette inferior */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(5,3,18,0.75) 0%, rgba(5,3,18,0.15) 50%, transparent 100%)',
            }}
          />

          {/* Badge precio */}
          <div
            className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm"
            style={{
              background: 'rgba(5,3,18,0.65)',
              border: '1px solid rgba(255,45,160,0.4)',
              color: '#ff82c5',
              letterSpacing: '0.03em',
            }}
          >
            {servicio.precio}
          </div>


        </div>

        {/* ── Contenido ── */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          <h3
            className="text-lg font-medium font-heading leading-snug"
            style={{ color: '#e2d9f3' }}
          >
            {servicio.titulo}
          </h3>

          <div className="relative">
            <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'rgba(226,217,243,0.45)' }}>
              {servicio.descripcion}
            </p>
            <span
              className="text-xs font-semibold cursor-pointer"
              style={{ color: 'rgba(255,130,197,0.7)' }}
            >
              Ver más
            </span>
          </div>

          <div
            className="h-px w-full"
            style={{
              background: 'linear-gradient(90deg, rgba(255,45,160,0.4), rgba(192,38,211,0.3), transparent)',
            }}
          />

          {/* WhatsApp — detiene propagación para no abrir el modal */}
          <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full text-xs font-bold py-2.5 rounded-xl transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: '#fff',
                boxShadow: '0 0 16px rgba(34,197,94,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 28px rgba(34,197,94,0.55)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 16px rgba(34,197,94,0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <WhatsAppIcon size={15} />
              Consultar por WhatsApp
            </a>
          </div>
        </div>

        {/* Borde hover glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ border: '1px solid rgba(255,45,160,0.3)', boxShadow: 'inset 0 0 30px rgba(255,45,160,0.04)' }}
        />
      </motion.article>

      {/* ── Modal (portal → renderiza directo en body, fuera de cualquier transform) ── */}
      {createPortal(<AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            style={{ background: 'rgba(2,2,8,0.88)', backdropFilter: 'blur(14px)' }}
          >
            <motion.div
              className="relative w-full overflow-hidden rounded-2xl flex flex-col md:flex-row"
              style={{
                maxWidth: '860px',
                maxHeight: '90vh',
                background: 'rgba(10,5,30,0.97)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 32px 100px rgba(0,0,0,0.7)',
              }}
              initial={{ scale: 0.93, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Imagen — ocupa columna izquierda en desktop, franja top en mobile */}
              <div className="relative overflow-hidden md:w-[52%] shrink-0 h-48 md:h-auto">
                <img
                  src={servicio.imagen}
                  alt={servicio.titulo}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradiente lateral derecho solo en desktop */}
                <div
                  className="absolute inset-0 pointer-events-none hidden md:block"
                  style={{ background: 'linear-gradient(to right, transparent 60%, rgba(10,5,30,0.97) 100%)' }}
                />
                {/* Gradiente inferior solo en mobile */}
                <div
                  className="absolute inset-0 pointer-events-none md:hidden"
                  style={{ background: 'linear-gradient(to top, rgba(10,5,30,0.97) 0%, transparent 60%)' }}
                />
              </div>

              {/* Contenido — columna derecha en desktop */}
              <div className="flex flex-col justify-center p-7 md:p-8 overflow-y-auto">
                {/* Precio */}
                <span
                  className="text-xs font-bold mb-3 inline-block"
                  style={{
                    color: '#ff82c5',
                    letterSpacing: '0.06em',
                    textShadow: '0 0 10px rgba(255,45,160,0.4)',
                  }}
                >
                  {servicio.precio}
                </span>

                <h3 className="text-2xl md:text-3xl font-semibold font-heading mb-3" style={{ color: '#e2d9f3' }}>
                  {servicio.titulo}
                </h3>

                <div
                  className="h-px mb-4"
                  style={{ background: 'linear-gradient(90deg, rgba(255,45,160,0.5), rgba(192,38,211,0.3), transparent)' }}
                />

                <p className="text-sm leading-relaxed mb-7" style={{ color: 'rgba(226,217,243,0.62)' }}>
                  {servicio.descripcion}
                </p>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    color: '#fff',
                    boxShadow: '0 0 20px rgba(34,197,94,0.35)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 32px rgba(34,197,94,0.6)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(34,197,94,0.35)'; }}
                  onClick={() => setOpen(false)}
                >
                  <WhatsAppIcon size={16} />
                  Consultar por WhatsApp
                </a>
              </div>

              {/* Cerrar */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 p-2.5 rounded-full transition-all"
                style={{
                  background: 'rgba(5,3,18,0.85)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(226,217,243,0.7)',
                  minWidth: '44px',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#e2d9f3'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(226,217,243,0.7)'; }}
              >
                <X size={17} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </>
  );
}
