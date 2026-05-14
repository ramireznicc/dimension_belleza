import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

const WA_NUMBER = '543413080131';

function DescripcionText({ text, className, style }) {
  const parts = text.split('\n');
  const lastIdx = parts.map((p, i) => ({ p, i })).filter(({ p }) => p.trim()).pop()?.i ?? parts.length - 1;
  return (
    <p className={className} style={{ ...style, whiteSpace: 'pre-line' }}>
      {parts.map((part, i) => (
        <span key={i}>
          {i === lastIdx
            ? <strong style={{ color: 'rgba(226,217,243,0.9)', fontWeight: 600 }}>{part}</strong>
            : part}
          {i < parts.length - 1 ? '\n' : null}
        </span>
      ))}
    </p>
  );
}

export default function ServicioCard({ servicio, index = 0 }) {
  const [open, setOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [imgDir, setImgDir] = useState(1);
  const imgs = servicio.imagenes?.length > 1 ? servicio.imagenes : null;

  useEffect(() => {
    if (!open) setImgIndex(0);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight' && imgs) nextImg();
      if (e.key === 'ArrowLeft' && imgs) prevImg();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, imgs, imgIndex]);

  const prevImg = () => { setImgDir(-1); setImgIndex((i) => (i - 1 + imgs.length) % imgs.length); };
  const nextImg = () => { setImgDir(1);  setImgIndex((i) => (i + 1) % imgs.length); };

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hola! Estoy interesadx en ${servicio.titulo} 😊`
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
        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', background: 'rgba(5,3,18,0.6)' }}>
          {servicio.imagen?.endsWith('.mp4') ? (
            <video
              src={servicio.imagen}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
              autoPlay loop muted playsInline
            />
          ) : (
            <img
              src={servicio.imagen}
              alt={servicio.titulo}
              loading="lazy"
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
            />
          )}

          {/* Vignette inferior */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(5,3,18,0.75) 0%, rgba(5,3,18,0.15) 50%, transparent 100%)',
            }}
          />
        </div>

        {/* ── Contenido ── */}
        <div className="flex flex-col flex-1 p-3 sm:p-5 gap-2 sm:gap-3">
          <h3
            className="text-sm sm:text-lg font-medium font-heading leading-snug"
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

          {servicio.precio && (
            <span
              className="text-sm sm:text-base font-extrabold"
              style={{
                background: 'linear-gradient(90deg, #ff2da0, #c026d3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {servicio.precio}
            </span>
          )}

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
              <span className="hidden sm:inline">Consultar por WhatsApp</span>
              <span className="sm:hidden">Consultar</span>
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
                maxWidth: '1280px',
                maxHeight: '92vh',
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
              {/* Imagen / carrusel — columna izquierda en desktop, franja top en mobile */}
              <div className="relative overflow-hidden md:w-[55%] shrink-0 h-64 md:h-auto md:min-h-[580px]" style={{ background: 'rgba(5,3,18,0.6)' }}>
                <AnimatePresence mode="wait" custom={imgDir}>
                  {(() => {
                    const src = imgs ? imgs[imgIndex] : servicio.imagen;
                    return src?.endsWith('.mp4') ? (
                      <video
                        key={src}
                        src={src}
                        className="absolute inset-0 w-full h-full object-contain"
                        autoPlay loop muted playsInline
                      />
                    ) : (
                      <motion.img
                        key={src}
                        src={src}
                        alt={servicio.titulo}
                        className="absolute inset-0 w-full h-full object-contain"
                        custom={imgDir}
                        initial={{ opacity: 0, x: imgDir * 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: imgDir * -30 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      />
                    );
                  })()}
                </AnimatePresence>

                {/* Flechas de navegación (solo si hay varias imágenes) */}
                {imgs && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImg(); }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full transition-all"
                      style={{ background: 'rgba(5,3,18,0.7)', border: '1px solid rgba(255,255,255,0.15)', color: '#e2d9f3' }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImg(); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full transition-all"
                      style={{ background: 'rgba(5,3,18,0.7)', border: '1px solid rgba(255,255,255,0.15)', color: '#e2d9f3' }}
                    >
                      <ChevronRight size={16} />
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                      {imgs.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); setImgDir(i > imgIndex ? 1 : -1); setImgIndex(i); }}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: i === imgIndex ? '14px' : '5px',
                            height: '5px',
                            background: i === imgIndex ? '#ff2da0' : 'rgba(255,255,255,0.3)',
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}

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
                <h3 className="text-2xl md:text-3xl font-semibold font-heading mb-3" style={{ color: '#e2d9f3' }}>
                  {servicio.titulo}
                </h3>

                <div
                  className="h-px mb-4"
                  style={{ background: 'linear-gradient(90deg, rgba(255,45,160,0.5), rgba(192,38,211,0.3), transparent)' }}
                />

                <DescripcionText
                  text={servicio.descripcion}
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: 'rgba(226,217,243,0.62)' }}
                />

                {servicio.precio && (
                  <span
                    className="text-xl md:text-2xl font-extrabold mb-6 inline-block"
                    style={{
                      background: 'linear-gradient(90deg, #ff2da0, #c026d3)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {servicio.precio}
                  </span>
                )}

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
