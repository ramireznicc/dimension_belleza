import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import IconInstagram from './IconInstagram';

const INTERVAL = 4800;

const reseñas = [
  {
    user: 'vale.martinez_',
    inicial: 'V',
    color: '#f43f5e',
    texto: 'Salí completamente transformada. El trato es increíble y los resultados hablan solos ✨',
    likes: 47,
    tiempo: '2 d',
  },
  {
    user: 'caro.perez92',
    inicial: 'C',
    color: '#8b5cf6',
    texto: 'Me hice el balayage y quedé re contenta!! Ya quiero volver para el siguiente turno 💕',
    likes: 31,
    tiempo: '5 d',
  },
  {
    user: 'sofi__gtz',
    inicial: 'S',
    color: '#06b6d4',
    texto: 'El masaje holístico fue una experiencia única, me fui totalmente renovada. Gracias chicas 🙏',
    likes: 28,
    tiempo: '1 sem',
  },
  {
    user: 'luci.romero',
    inicial: 'L',
    color: '#f97316',
    texto: 'Fui por la depilación láser y el dolor es mínimo. Super profesionales, ya noto la diferencia! ⭐',
    likes: 53,
    tiempo: '1 sem',
  },
  {
    user: 'maru_skin',
    inicial: 'M',
    color: '#10b981',
    texto: 'La limpieza facial me dejó la piel increíble. El lugar es hermoso y el ambiente muy bueno 🌸',
    likes: 39,
    tiempo: '2 sem',
  },
];

export default function InstagramTestimonials() {
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % reseñas.length);
      setProgressKey((k) => k + 1);
    }, INTERVAL);
    return () => clearInterval(t);
  }, []);

  const reseña = reseñas[current];

  return (
    <motion.div
      className="flex justify-center px-4"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{
          maxWidth: '380px',
          background: '#000',
          border: '1px solid #262626',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-3 py-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #ff2da0, #c026d3, #818cf8)',
              padding: '2px',
            }}
          >
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
              <img src="/dimension_belleza_LOGO.svg" alt="" className="w-5 h-5 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold leading-none mb-0.5" style={{ color: '#fff' }}>dimensionbelleza</p>
            <p className="text-xs leading-none" style={{ color: '#a8a8a8' }}>Funes · Rosario</p>
          </div>
          <MoreHorizontal size={18} style={{ color: '#fff' }} />
        </div>

        {/* ── Imagen del post ── */}
        <div
          className="relative flex items-center justify-center"
          style={{
            aspectRatio: '1',
            background: 'radial-gradient(ellipse 80% 70% at 30% 40%, rgba(192,38,211,0.45) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 75% 65%, rgba(255,45,160,0.35) 0%, transparent 55%), #0a0515',
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <img
              src="/dimension_belleza_LOGO.svg"
              alt="Dimensión Belleza"
              className="w-24 opacity-90"
              style={{ filter: 'drop-shadow(0 0 20px rgba(255,45,160,0.5))' }}
            />
            <p
              className="text-xs tracking-widest uppercase"
              style={{
                color: 'rgba(226,217,243,0.5)',
                fontFamily: "'Syne', sans-serif",
                letterSpacing: '0.2em',
              }}
            >
              Tu transformación empieza acá
            </p>
          </div>
        </div>

        {/* ── Acciones ── */}
        <div className="flex items-center px-3 pt-2.5 pb-1 gap-3.5">
          <Heart size={22} style={{ color: '#fff' }} />
          <MessageCircle size={22} style={{ color: '#fff' }} />
          <Send size={20} style={{ color: '#fff' }} />
          <Bookmark size={21} className="ml-auto" style={{ color: '#fff' }} />
        </div>

        {/* ── Likes ── */}
        <div className="px-3 pb-1">
          <p className="text-xs font-bold" style={{ color: '#fff' }}>1.247 Me gusta</p>
        </div>

        {/* ── Caption ── */}
        <div className="px-3 pb-2">
          <p className="text-xs leading-relaxed" style={{ color: '#fff' }}>
            <span className="font-bold">dimensionbelleza</span>
            {' '}Estilismo, estética y depilación láser en Funes y Rosario 💜✨
          </p>
        </div>

        {/* ── Separador ── */}
        <div className="mx-3" style={{ borderTop: '1px solid #262626' }} />

        {/* ── Comentario animado ── */}
        <div className="px-3 pt-3 pb-2" style={{ minHeight: '80px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex gap-2.5">
                {/* Avatar */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
                  style={{ background: reseña.color, fontSize: '11px' }}
                >
                  {reseña.inicial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs leading-relaxed" style={{ color: '#fff' }}>
                    <span className="font-bold">{reseña.user}</span>
                    {' '}{reseña.texto}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs" style={{ color: '#a8a8a8' }}>{reseña.tiempo}</span>
                    <span className="text-xs font-semibold" style={{ color: '#a8a8a8' }}>Me gusta</span>
                    <span className="text-xs font-semibold" style={{ color: '#a8a8a8' }}>Responder</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-0.5 shrink-0 pt-0.5">
                  <Heart size={11} style={{ color: '#a8a8a8' }} />
                  <span className="text-xs" style={{ color: '#a8a8a8', fontSize: '10px' }}>{reseña.likes}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Barra de progreso + dots ── */}
        <div className="px-3 pb-3 flex flex-col gap-2">
          {/* Progress bar */}
          <div className="w-full h-px rounded-full overflow-hidden" style={{ background: '#262626' }}>
            <motion.div
              key={progressKey}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #ff2da0, #c026d3)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
            />
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5">
            {reseñas.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setProgressKey((k) => k + 1); }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '16px' : '6px',
                  height: '6px',
                  background: i === current
                    ? 'linear-gradient(90deg, #ff2da0, #c026d3)'
                    : '#333',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Footer: ver en Instagram ── */}
        <a
          href="https://www.instagram.com/dimensionbelleza/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 transition-colors"
          style={{
            borderTop: '1px solid #262626',
            color: '#a8a8a8',
            fontSize: '12px',
            fontWeight: 600,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#a8a8a8')}
        >
          <IconInstagram size={14} />
          Ver en Instagram
        </a>
      </div>
    </motion.div>
  );
}
