import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Wand2, SendHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/servicios', label: 'Servicios', icon: Wand2 },
  { to: '/contacto', label: 'Contacto', icon: SendHorizontal },
];

export default function Navbar() {
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
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10 mx-auto">
          {links.map(({ to, label, icon: Icon }) => {
            const isActive = pathname === to;
            return (
              <li key={to}>
                <Link to={to} className="relative block py-1 group" style={{ textDecoration: 'none' }}>
                  <motion.span
                    className="text-sm font-medium tracking-wide flex items-center gap-1.5"
                    animate={{
                      color: isActive ? '#ff2da0' : 'rgba(226,217,243,0.6)',
                      textShadow: isActive
                        ? '0 0 14px rgba(255,45,160,0.6)'
                        : 'none',
                    }}
                    whileHover={{ color: '#ff82c5' }}
                    transition={{ duration: 0.15 }}
                  >
                    <Icon size={15} />
                    {label}
                  </motion.span>

                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        className="absolute left-0 right-0 -bottom-0.5 h-px"
                        style={{
                          background: 'linear-gradient(90deg, transparent, #ff2da0, #c026d3, transparent)',
                          boxShadow: '0 0 6px rgba(255,45,160,0.7)',
                        }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      />
                    )}
                  </AnimatePresence>

                  {!isActive && (
                    <span
                      className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,130,197,0.45), transparent)',
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger (mobile) */}
        <div className="flex items-center md:hidden ml-auto">
          <button
            className="md:hidden p-2 rounded-full transition-colors cursor-pointer"
            style={{ color: 'rgba(226,217,243,0.8)' }}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — con íconos */}
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
              {links.map(({ to, label, icon: Icon }) => {
                const isActive = pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm font-medium transition-all"
                    style={{
                      color: isActive ? '#ff2da0' : 'rgba(226,217,243,0.65)',
                      background: isActive ? 'rgba(255,45,160,0.08)' : 'transparent',
                      borderLeft: isActive ? '2px solid #ff2da0' : '2px solid transparent',
                    }}
                  >
                    <Icon size={16} />
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
