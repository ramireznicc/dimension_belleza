import { Phone, MapPin, Sparkles } from 'lucide-react';
import IconInstagram from './IconInstagram';

export default function Footer() {
  return (
    <footer
      className="relative z-10"
      style={{
        background: 'rgba(2, 2, 8, 0.95)',
        borderTop: '1px solid rgba(255, 45, 160, 0.15)',
      }}
    >
      {/* Nebula glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(192,38,211,0.12) 0%, transparent 70%)',
          transform: 'translateX(-50%) translateY(-50%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <div>
          <div className="flex items-center gap-1.5 text-xl mb-3 font-megrim">
            <Sparkles size={14} style={{ color: '#ff2da0' }} />
            <span className="gradient-text">Dimensión</span>
            <span style={{ color: '#e2d9f3' }}>Belleza</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,217,243,0.45)' }}>
            Estilismo, Estética Corporal & Facial y Depilación Láser.
            Tu transformación empieza acá.
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-3 font-heading" style={{ color: 'rgba(226,217,243,0.85)' }}>Servicios</h4>
          <ul className="text-sm space-y-2" style={{ color: 'rgba(226,217,243,0.4)' }}>
            <li>Estilismo</li>
            <li>Estética Facial</li>
            <li>Estética Corporal</li>
            <li>Depilación Láser</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-3 font-heading" style={{ color: 'rgba(226,217,243,0.85)' }}>Contacto</h4>
          <ul className="text-sm space-y-3" style={{ color: 'rgba(226,217,243,0.4)' }}>
            <li className="flex items-center gap-2">
              <Phone size={14} style={{ color: '#ff2da0', flexShrink: 0 }} />
              <a href="https://wa.me/5493413080130" style={{ color: 'rgba(226,217,243,0.4)' }}>+54 9 3413 08-0130</a>
            </li>
            <li className="flex items-center gap-2">
              <IconInstagram size={14} style={{ color: '#ff2da0', flexShrink: 0 }} />
              <a href="https://www.instagram.com/dimensionbelleza/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(226,217,243,0.4)' }}>@dimensionbelleza</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} style={{ color: '#ff2da0', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ color: 'rgba(226,217,243,0.4)' }}>
                Los Olmos 695, Funes<br />
                Colón 2308, Rosario
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="text-center py-4 text-xs"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          color: 'rgba(226,217,243,0.25)',
        }}
      >
        © {new Date().getFullYear()} Dimensión Belleza. Todos los derechos reservados.
      </div>
    </footer>
  );
}
