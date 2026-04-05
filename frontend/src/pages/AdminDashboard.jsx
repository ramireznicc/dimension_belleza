import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Pencil, Check, X, RotateCcw } from 'lucide-react';
import { clearSession } from '../utils/auth';
import { categorias } from '../data/servicios';
import { getOverrides, saveOverride, mergeWithOverrides } from '../utils/serviciosStorage';

function ServiceRow({ servicio, onSave }) {
  const overrides = getOverrides();
  const current = { ...servicio, ...(overrides[servicio.id] || {}) };
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ precio: current.precio, descripcion: current.descripcion });
  const [saved, setSaved] = useState(false);
  const isModified = !!overrides[servicio.id];

  const handleSave = () => {
    saveOverride(servicio.id, form);
    setSaved(true);
    setEditing(false);
    onSave();
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    saveOverride(servicio.id, { precio: servicio.precio, descripcion: servicio.descripcion });
    setForm({ precio: servicio.precio, descripcion: servicio.descripcion });
    onSave();
  };

  const handleCancel = () => {
    setForm({ precio: current.precio, descripcion: current.descripcion });
    setEditing(false);
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '13px',
    color: '#e2d9f3',
    width: '100%',
    outline: 'none',
  };

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${isModified ? 'rgba(255,45,160,0.25)' : 'rgba(255,255,255,0.07)'}`,
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-medium font-heading text-sm" style={{ color: '#e2d9f3' }}>
            {servicio.titulo}
          </span>
          {isModified && (
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,45,160,0.15)', color: '#ff82c5', border: '1px solid rgba(255,45,160,0.25)' }}
            >
              editado
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {isModified && !editing && (
            <button
              onClick={handleReset}
              title="Restablecer original"
              className="p-1.5 rounded-lg transition-all"
              style={{ color: 'rgba(226,217,243,0.35)', background: 'rgba(255,255,255,0.04)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(226,217,243,0.7)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(226,217,243,0.35)'}
            >
              <RotateCcw size={13} />
            </button>
          )}
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: saved ? 'rgba(34,197,94,0.15)' : 'rgba(255,45,160,0.1)',
                color: saved ? '#4ade80' : '#ff82c5',
                border: `1px solid ${saved ? 'rgba(34,197,94,0.3)' : 'rgba(255,45,160,0.25)'}`,
              }}
            >
              {saved ? <><Check size={12} /> Guardado</> : <><Pencil size={12} /> Editar</>}
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={{ background: 'rgba(34,197,94,0.2)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}
              >
                <Check size={12} /> Guardar
              </button>
              <button
                onClick={handleCancel}
                className="p-1.5 rounded-lg transition-all"
                style={{ color: 'rgba(226,217,243,0.4)', background: 'rgba(255,255,255,0.05)' }}
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {editing ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div>
              <label className="block text-xs mb-1" style={{ color: 'rgba(226,217,243,0.5)' }}>Precio</label>
              <input
                type="text"
                value={form.precio}
                onChange={(e) => setForm({ ...form, precio: e.target.value })}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(255,45,160,0.5)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
              />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'rgba(226,217,243,0.5)' }}>Descripción</label>
              <textarea
                rows={4}
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(255,45,160,0.5)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-1"
          >
            <p className="text-xs font-semibold" style={{ color: 'rgba(255,130,197,0.8)' }}>
              {form.precio}
            </p>
            <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'rgba(226,217,243,0.4)' }}>
              {form.descripcion}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [, forceUpdate] = useState(0);

  const handleLogout = () => {
    clearSession();
    navigate('/admin');
  };

  const categoriasConOverrides = mergeWithOverrides(categorias);

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'radial-gradient(ellipse 70% 55% at 15% 20%, rgba(139,20,180,0.25) 0%, transparent 65%), radial-gradient(ellipse 55% 45% at 85% 75%, rgba(236,72,153,0.18) 0%, transparent 60%), #020208',
      }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10"
        style={{
          background: 'rgba(2,2,8,0.9)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,45,160,0.12)',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/dimension_belleza_LOGO.svg" alt="" className="w-7" style={{ filter: 'drop-shadow(0 0 8px rgba(255,45,160,0.3))' }} />
            <span className="text-sm font-semibold font-heading" style={{ color: 'rgba(226,217,243,0.8)' }}>
              Panel de administración
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{ color: 'rgba(226,217,243,0.5)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ff82c5'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(226,217,243,0.5)'}
          >
            <LogOut size={13} />
            Salir
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-2xl font-medium font-heading mb-1" style={{ color: '#e2d9f3' }}>
            Servicios
          </h1>
          <p className="text-sm mb-8" style={{ color: 'rgba(226,217,243,0.4)' }}>
            Editá el precio y la descripción de cada servicio. Los cambios se aplican inmediatamente.
          </p>

          <div className="space-y-8">
            {categoriasConOverrides.map((cat) => (
              <div key={cat.id}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-base font-semibold font-heading gradient-text">{cat.titulo}</h2>
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,45,160,0.3), transparent)' }} />
                </div>
                <div className="space-y-3">
                  {cat.servicios.map((s) => (
                    <ServiceRow
                      key={s.id}
                      servicio={categorias.flatMap(c => c.servicios).find(x => x.id === s.id)}
                      onSave={() => forceUpdate(n => n + 1)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
