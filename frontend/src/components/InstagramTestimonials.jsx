import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import IconInstagram from './IconInstagram';

const INTERVAL = 4500;

const reseñas = [
  { user: 'vale.martinez_',  inicial: 'V', color: '#f43f5e', texto: 'Salí completamente transformada. El trato es increíble y los resultados hablan solos ✨', likes: 47, tiempo: '2 d' },
  { user: 'caro.perez92',    inicial: 'C', color: '#8b5cf6', texto: 'Me hice el balayage y quedé re contenta!! Ya quiero volver para el siguiente turno 💕', likes: 31, tiempo: '5 d' },
  { user: 'sofi__gtz',       inicial: 'S', color: '#06b6d4', texto: 'El masaje holístico fue una experiencia única, me fui totalmente renovada. Gracias chicas 🙏', likes: 28, tiempo: '1 sem' },
  { user: 'luci.romero',     inicial: 'L', color: '#f97316', texto: 'Fui por la depilación láser y el dolor es mínimo. Super profesionales, ya noto la diferencia! ⭐', likes: 53, tiempo: '1 sem' },
  { user: 'maru_skin',       inicial: 'M', color: '#10b981', texto: 'La limpieza facial me dejó la piel increíble. El lugar es hermoso y el ambiente muy bueno 🌸', likes: 39, tiempo: '2 sem' },
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

  const r = reseñas[current];

  return (
    <motion.div
      className="flex justify-center px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full" style={{ maxWidth: '360px' }}>

        {/* Tarjeta estilo captura IG */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: '#000',
            border: '1px solid #1c1c1e',
            boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
          }}
        >
          {/* Header fijo del post — simula el encabezado de comentarios */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: '1px solid #1c1c1e' }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #ff2da0, #c026d3, #818cf8)', padding: '1.5px' }}
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <img src="/dimension_belleza_LOGO.svg" alt="" className="w-3.5" style={{ filter: 'brightness(0) invert(1)' }} />
                </div>
              </div>
              <span className="text-xs font-semibold" style={{ color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
                dimensionbelleza
              </span>
            </div>
            <IconInstagram size={15} style={{ color: '#a8a8a8' }} />
          </div>

          {/* Comentario animado */}
          <div className="px-4 py-4" style={{ minHeight: '88px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="flex gap-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white font-bold"
                  style={{ background: r.color, fontSize: '12px', fontFamily: 'system-ui, sans-serif' }}
                >
                  {r.inicial}
                </div>

                {/* Texto + meta */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-relaxed" style={{ color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
                    <span className="font-semibold">{r.user}</span>
                    {' '}{r.texto}
                  </p>
                  <div className="flex items-center gap-4 mt-1.5">
                    <span className="text-xs" style={{ color: '#a8a8a8', fontFamily: 'system-ui, sans-serif' }}>{r.tiempo}</span>
                    <span className="text-xs font-semibold" style={{ color: '#a8a8a8', fontFamily: 'system-ui, sans-serif' }}>Me gusta</span>
                    <span className="text-xs font-semibold" style={{ color: '#a8a8a8', fontFamily: 'system-ui, sans-serif' }}>Responder</span>
                  </div>
                </div>

                {/* Corazón + likes */}
                <div className="flex flex-col items-center gap-0.5 shrink-0 pt-1">
                  <Heart size={12} style={{ color: '#a8a8a8' }} />
                  <span className="text-xs" style={{ color: '#a8a8a8', fontSize: '10px', fontFamily: 'system-ui, sans-serif' }}>{r.likes}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Barra de progreso */}
          <div className="mx-4 mb-3 rounded-full overflow-hidden" style={{ height: '2px', background: '#1c1c1e' }}>
            <motion.div
              key={progressKey}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #ff2da0, #c026d3)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
            />
          </div>

          {/* Dots + link IG */}
          <div
            className="flex items-center justify-between px-4 pb-3"
          >
            <div className="flex gap-1.5">
              {reseñas.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setProgressKey((k) => k + 1); }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '14px' : '5px',
                    height: '5px',
                    background: i === current ? '#fff' : '#333',
                  }}
                />
              ))}
            </div>
            <a
              href="https://www.instagram.com/dimensionbelleza/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
              style={{ color: '#a8a8a8', fontFamily: 'system-ui, sans-serif' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#a8a8a8')}
            >
              Ver perfil
              <IconInstagram size={12} />
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
