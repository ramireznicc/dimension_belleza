import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [labelOpen, setLabelOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cuando aparece: abre el label automáticamente, luego lo cierra
  useEffect(() => {
    if (!visible) { setLabelOpen(false); return; }
    const t1 = setTimeout(() => setLabelOpen(true), 600);
    const t2 = setTimeout(() => setLabelOpen(false), 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/543413080131?text=Hola!%20Quisiera%20hacer%20una%20consulta."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-5 z-50 flex items-center rounded-2xl cursor-pointer select-none overflow-hidden"
          initial={{ opacity: 0, y: 24, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          onMouseEnter={() => setLabelOpen(true)}
          onMouseLeave={() => setLabelOpen(false)}
          style={{
            background: 'linear-gradient(135deg, #25d366 0%, #16a34a 100%)',
            boxShadow: '0 0 14px rgba(37,211,102,0.28), 0 4px 16px rgba(0,0,0,0.4)',
            padding: '13px',
          }}
        >
          {/* Anillo de ping */}
          <motion.span
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{ scale: [1, 1.5], opacity: [0.25, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', repeatDelay: 1.5 }}
            style={{ background: 'rgba(37,211,102,0.35)' }}
          />

          <WhatsAppIcon size={24} />

          <AnimatePresence>
            {labelOpen && (
              <motion.span
                key="label"
                className="whitespace-nowrap text-sm font-bold text-white overflow-hidden block"
                initial={{ maxWidth: 0, opacity: 0, marginLeft: 0 }}
                animate={{ maxWidth: 160, opacity: 1, marginLeft: 9 }}
                exit={{ maxWidth: 0, opacity: 0, marginLeft: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ paddingRight: '4px' }}
              >
                ¡Hacé tu consulta!
              </motion.span>
            )}
          </AnimatePresence>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
