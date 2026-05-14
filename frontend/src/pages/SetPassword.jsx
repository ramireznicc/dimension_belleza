import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

export default function SetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase auto-parses the #access_token hash on init
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setSessionReady(true);
      } else {
        navigate('/admin');
      }
    });
  }, [navigate]);

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#e2d9f3',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setLoading(true);
    setError('');
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError('Error al guardar la contraseña. Intentá de nuevo.');
      setLoading(false);
      return;
    }
    navigate('/admin/dashboard');
  };

  if (!sessionReady) return null;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          'radial-gradient(ellipse 70% 55% at 15% 20%, rgba(139,20,180,0.25) 0%, transparent 65%), radial-gradient(ellipse 55% 45% at 85% 75%, rgba(236,72,153,0.18) 0%, transparent 60%), #020208',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <img
            src="/dimension_belleza_LOGO.svg"
            alt="Dimensión Belleza"
            className="w-16 mx-auto mb-4"
            style={{ filter: 'drop-shadow(0 0 16px rgba(255,45,160,0.3))' }}
          />
          <h1
            className="text-2xl font-medium font-heading"
            style={{
              background: 'linear-gradient(135deg, #ff2da0 0%, #c026d3 50%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Crear contraseña
          </h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(226,217,243,0.4)' }}>
            Configurá tu contraseña para acceder al panel
          </p>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(226,217,243,0.7)' }}>
                Nueva contraseña
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(255,45,160,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(255,45,160,0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(226,217,243,0.7)' }}>
                Confirmar contraseña
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(255,45,160,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(255,45,160,0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-center py-2 px-3 rounded-lg"
                style={{
                  color: '#ff82c5',
                  background: 'rgba(255,45,160,0.1)',
                  border: '1px solid rgba(255,45,160,0.2)',
                }}
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer"
              style={{
                background: loading
                  ? 'rgba(255,45,160,0.3)'
                  : 'linear-gradient(135deg, #ff2da0 0%, #c026d3 100%)',
                color: '#fff',
                boxShadow: loading ? 'none' : '0 0 20px rgba(255,45,160,0.35)',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Guardando...' : 'Guardar y acceder'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
