import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/tienda', label: 'Tienda' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(2, 2, 8, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 45, 160, 0.15)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 grid items-center" style={{ gridTemplateColumns: '1fr auto 1fr' }}>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 text-2xl font-megrim justify-self-start">
          <span className="gradient-text">DB</span>
          <Sparkles size={14} style={{ color: '#ff2da0' }} />
        </Link>

        {/* Desktop links — centro */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => {
            const isActive = pathname === to;
            return (
              <li key={to}>
                <Link to={to} className="relative block py-1 group" style={{ textDecoration: 'none' }}>
                  {/* Texto con animación de hover */}
                  <motion.span
                    className="text-sm font-bold block tracking-wide"
                    animate={{
                      color: isActive ? '#ff2da0' : 'rgba(226,217,243,0.65)',
                      textShadow: isActive
                        ? '0 0 14px rgba(255,45,160,0.7), 0 0 30px rgba(255,45,160,0.3)'
                        : 'none',
                    }}
                    whileHover={{
                      color: '#ff82c5',
                      textShadow: '0 0 10px rgba(255,130,197,0.5)',
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ letterSpacing: isActive ? '0.06em' : '0.02em' }}
                  >
                    {label}
                  </motion.span>

                  {/* Línea degradada animada debajo del activo */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 right-0 -bottom-0.5 h-px"
                        style={{
                          background: 'linear-gradient(90deg, transparent, #ff2da0, #c026d3, transparent)',
                          boxShadow: '0 0 6px rgba(255,45,160,0.8)',
                        }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Línea de hover (solo cuando NO es activo) */}
                  {!isActive && (
                    <span
                      className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,130,197,0.5), transparent)',
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Cart + hamburger — derecha */}
        <div className="flex items-center gap-3 justify-self-end">
          <Link
            to="/carrito"
            className="relative p-2 rounded-full transition-all duration-200"
            style={{ color: 'rgba(226,217,243,0.8)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ff2da0')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(226,217,243,0.8)')}
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span
                className="absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                style={{
                  background: 'linear-gradient(135deg, #ff2da0, #c026d3)',
                  boxShadow: '0 0 10px rgba(255,45,160,0.7)',
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="md:hidden p-2 rounded-full transition-colors"
            style={{ color: 'rgba(226,217,243,0.8)' }}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(2, 2, 8, 0.97)',
              borderTop: '1px solid rgba(255,45,160,0.1)',
            }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map(({ to, label }) => {
                const isActive = pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm font-bold tracking-wide transition-all"
                    style={{
                      color: isActive ? '#ff2da0' : 'rgba(226,217,243,0.65)',
                      background: isActive ? 'rgba(255,45,160,0.08)' : 'transparent',
                      borderLeft: isActive ? '2px solid #ff2da0' : '2px solid transparent',
                    }}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
