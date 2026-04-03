import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Share2, MapPin, Send, MessageCircle, Clock } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const texto = encodeURIComponent(
      `Hola! Soy ${form.nombre}.\n${form.mensaje}\n\nEmail: ${form.email}`
    );
    window.open(`https://wa.me/5493413080130?text=${texto}`, '_blank');
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#e2d9f3',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div className="section-indigo flex-1">
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div className="text-center mb-14" {...fadeUp(0)}>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading">
            <span className="gradient-text">Contacto</span>{' '}
            <span style={{ color: '#e2d9f3' }}>& Turnos</span>
          </h1>
          <p style={{ color: 'rgba(226,217,243,0.55)' }}>
            Escribinos y te respondemos a la brevedad.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Formulario */}
          <motion.div {...fadeUp(0.1)}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(226,217,243,0.7)' }}>
                  Tu nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  required
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Valentina"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(255,45,160,0.5)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(226,217,243,0.7)' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(255,45,160,0.5)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(226,217,243,0.7)' }}>
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  required
                  rows={5}
                  value={form.mensaje}
                  onChange={handleChange}
                  placeholder="Quiero saber más sobre depilación láser..."
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(255,45,160,0.5)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
              <button
                type="submit"
                className="w-full btn-neon justify-center"
                style={{ borderRadius: '12px' }}
              >
                {enviado ? '✓ ¡Enviado!' : <><Send size={16} /> Enviar por WhatsApp</>}
              </button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div {...fadeUp(0.2)} className="space-y-5">
            <div
              className="rounded-2xl p-6 space-y-5"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,45,160,0.15)',
              }}
            >
              <h3 className="font-bold mb-4 font-heading" style={{ color: '#e2d9f3' }}>Información de contacto</h3>

              {[
                {
                  icon: <MessageCircle size={17} className="text-white" />,
                  label: 'WhatsApp',
                  text: '+54 9 3413 08-0130',
                  href: 'https://wa.me/5493413080130',
                },
                {
                  icon: <Share2 size={17} className="text-white" />,
                  label: 'Instagram',
                  text: '@dimensionbelleza',
                  href: 'https://www.instagram.com/dimensionbelleza/',
                },
                {
                  icon: <MapPin size={17} className="text-white" />,
                  label: 'Peluquería — Funes',
                  text: 'Los Olmos 695, Funes',
                  href: 'https://maps.google.com/?q=Los+Olmos+695+Funes',
                },
                {
                  icon: <MapPin size={17} className="text-white" />,
                  label: 'Estética & Depilación — Rosario',
                  text: 'Colón 2308, Rosario',
                  href: 'https://maps.google.com/?q=Colón+2308+Rosario+Santa+Fe',
                },
              ].map(({ icon, label, text, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, #ff2da0, #c026d3)' }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'rgba(226,217,243,0.4)' }}>{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium transition-colors"
                        style={{ color: 'rgba(226,217,243,0.8)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ff2da0')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(226,217,243,0.8)')}
                      >
                        {text}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: 'rgba(226,217,243,0.8)' }}>{text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} style={{ color: '#ff2da0' }} />
                <h3 className="font-bold font-heading" style={{ color: '#e2d9f3' }}>Horarios</h3>
              </div>
              {[
                { dia: 'Lunes a Viernes', hora: '9:00 – 19:00' },
                { dia: 'Sábados', hora: '9:00 – 14:00' },
                { dia: 'Domingos', hora: 'Cerrado' },
              ].map(({ dia, hora }) => (
                <div key={dia} className="flex justify-between text-sm py-1.5" style={{ color: 'rgba(226,217,243,0.6)' }}>
                  <span>{dia}</span>
                  <span
                    className="font-medium"
                    style={{ color: hora === 'Cerrado' ? 'rgba(255,45,160,0.6)' : 'rgba(226,217,243,0.85)' }}
                  >
                    {hora}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
