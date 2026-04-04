import { Phone, MapPin, Heart } from 'lucide-react';
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

      <div className="max-w-4xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 relative">
        <div>
          <img
            src="/dimension_belleza_LOGO.svg"
            alt="Dimensión Belleza"
            className="mb-2"
            style={{
              width: '80px',
              filter: 'drop-shadow(0 0 8px rgba(255,45,160,0.3))',
            }}
          />
          <span
            className="block mb-1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: '1.4rem',
              background: 'linear-gradient(135deg, #ff2da0 0%, #c026d3 50%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              WebkitTextStroke: '0.5px rgba(255,255,255,0.15)',
            }}
          >
            Dimensión Belleza
          </span>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,217,243,0.45)' }}>
            Tu transformación empieza acá.
          </p>
        </div>

        <div className="md:mx-auto">
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
              <a href="https://wa.me/543413080131" style={{ color: 'rgba(226,217,243,0.4)' }}>+54 3413 080131</a>
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
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        className="px-4 py-4 flex flex-col items-center gap-2 text-xs"
      >
        <span style={{ color: 'rgba(226,217,243,0.25)' }}>
          © {new Date().getFullYear()} Dimensión Belleza. Todos los derechos reservados.
        </span>
        <span className="flex items-center gap-1" style={{ color: 'rgba(226,217,243,0.25)' }}>
          Hecho con <Heart size={11} style={{ color: '#ff2da0', fill: '#ff2da0' }} /> por{' '}
          <a
            href="https://carsi.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: 'rgba(226,217,243,0.45)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ff2da0')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(226,217,243,0.45)')}
          >
            carsi
          </a>
          {' '}&amp;{' '}
          <a
            href="https://ramireznicc.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: 'rgba(226,217,243,0.45)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ff2da0')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(226,217,243,0.45)')}
          >
            ramireznicc
          </a>
        </span>
      </div>
    </footer>
  );
}
