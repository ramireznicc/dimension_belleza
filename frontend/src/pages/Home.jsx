import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicios } from '../data/servicios';
import { ArrowRight, Star, Sparkles, Zap } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
});

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* ── Hero — tinte púrpura profundo ── */}
      <section className="section-purple relative overflow-hidden py-24 px-4 text-center">
        <div className="relative max-w-4xl mx-auto">
          <motion.div {...fadeUp(0)}>
            <span className="cosmic-badge mb-8 inline-flex">
              <Sparkles size={13} />
              Tu espacio de transformación
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-6xl md:text-8xl leading-none mb-6 tracking-wide font-megrim"
          >
            <span className="neon-text block">Dimensión</span>
            <span className="neon-text-purple block">Belleza</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'rgba(226,217,243,0.65)' }}
          >
            Estilismo, Estética Corporal & Facial y Depilación Láser.
            Transformá tu imagen con profesionalismo y dedicación.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/servicios" className="btn-neon">
              Ver servicios <ArrowRight size={18} />
            </Link>
            <Link to="/contacto" className="btn-outline">
              Sacar turno
            </Link>
          </motion.div>
        </div>
      </section>

      <hr className="star-divider" />

      {/* ── Servicios — transparente (nebulosa global visible) ── */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-3 font-heading">
              <span className="gradient-text">Nuestros Servicios</span>
            </h2>
            <p style={{ color: 'rgba(226,217,243,0.5)' }}>Todo lo que necesitás en un solo lugar</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
          >
            {servicios.map((s) => (
              <motion.div
                key={s.id}
                variants={fadeUp(0)}
                className="space-card p-6 text-center cursor-default"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-medium mb-2 font-heading" style={{ color: '#e2d9f3' }}>{s.titulo}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,217,243,0.5)' }}>
                  {s.descripcion}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all"
              style={{ color: '#ff2da0' }}
            >
              Ver todos los servicios <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <hr className="star-divider" />

      {/* ── Testimonial — tinte índigo ── */}
      <section className="section-indigo py-20 px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center gap-1.5 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
            ))}
          </div>
          <blockquote
            className="text-xl md:text-2xl font-medium italic mb-5"
            style={{ color: 'rgba(226,217,243,0.85)' }}
          >
            "Salí completamente transformada. El trato es increíble y los resultados hablan solos."
          </blockquote>
          <p className="text-sm font-semibold" style={{ color: 'rgba(255,45,160,0.7)' }}>— Valentina M.</p>
        </motion.div>
      </section>

      <hr className="star-divider" />

      {/* ── CTA Tienda — tinte rosa ── */}
      <section className="section-pink py-20 px-4 flex-1">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Zap size={36} className="mx-auto mb-4" style={{ color: '#ff2da0' }} />
            <h2 className="text-3xl md:text-4xl font-medium mb-4 font-heading" style={{ color: '#e2d9f3' }}>
              También vendemos productos{' '}
              <span className="gradient-text">premium</span>
            </h2>
            <p className="mb-8" style={{ color: 'rgba(226,217,243,0.5)' }}>
              Para que sigas cuidándote desde casa.
            </p>
            <Link to="/tienda" className="btn-neon">
              Ir a la tienda <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
