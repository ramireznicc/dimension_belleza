import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const formatPrecio = (precio) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(precio);

export default function Carrito() {
  const { items, removeItem, updateCantidad, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        setError('No se pudo iniciar el pago. Intentá nuevamente.');
      }
    } catch {
      setError('Error de conexión. Intentá nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="section-deep flex-1 flex items-center justify-center px-4 py-20 min-h-[calc(100vh-64px)]">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <ShoppingBag size={72} className="mx-auto mb-6" style={{ color: 'rgba(255,45,160,0.3)' }} />
          <h2 className="text-2xl font-medium mb-2 font-heading" style={{ color: '#e2d9f3' }}>
            Tu carrito está vacío
          </h2>
          <p className="mb-8" style={{ color: 'rgba(226,217,243,0.5)' }}>
            Explorá nuestra tienda y agregá tus productos favoritos.
          </p>
          <Link to="/tienda" className="btn-neon">
            <ArrowLeft size={18} /> Ir a la tienda
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="section-deep flex-1">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-10">
            <Link
              to="/tienda"
              className="p-2 rounded-full transition-colors"
              style={{ color: 'rgba(226,217,243,0.4)' }}
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-3xl font-medium font-heading" style={{ color: '#e2d9f3' }}>
              Tu <span className="gradient-text">Carrito</span>
            </h1>
          </div>

          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <motion.div
                key={item.id}
                className="space-card p-4 flex items-center gap-4"
                layout
                exit={{ opacity: 0, x: -20 }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(255,45,160,0.2), rgba(192,38,211,0.15))' }}
                >
                  🧴
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate font-heading" style={{ color: '#e2d9f3' }}>{item.nombre}</h3>
                  <p className="text-sm font-bold gradient-text">{formatPrecio(item.precio)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCantidad(item.id, item.cantidad - 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                    style={{ border: '1px solid rgba(255,45,160,0.25)', color: 'rgba(226,217,243,0.6)' }}
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-6 text-center font-semibold" style={{ color: '#e2d9f3' }}>{item.cantidad}</span>
                  <button
                    onClick={() => updateCantidad(item.id, item.cantidad + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                    style={{ border: '1px solid rgba(255,45,160,0.25)', color: 'rgba(226,217,243,0.6)' }}
                  >
                    <Plus size={13} />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-2 transition-colors"
                  style={{ color: 'rgba(226,217,243,0.25)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#f87171')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(226,217,243,0.25)')}
                >
                  <Trash2 size={17} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Resumen */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'linear-gradient(135deg, rgba(255,45,160,0.08) 0%, rgba(192,38,211,0.06) 100%)',
              border: '1px solid rgba(255,45,160,0.2)',
            }}
          >
            <div className="flex justify-between items-center mb-5">
              <span className="font-medium" style={{ color: 'rgba(226,217,243,0.7)' }}>Total</span>
              <span className="text-2xl font-extrabold gradient-text">{formatPrecio(total)}</span>
            </div>

            {error && (
              <p className="text-sm text-red-400 mb-4 text-center">{error}</p>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full btn-neon justify-center disabled:opacity-60"
              style={{ borderRadius: '12px' }}
            >
              {loading ? 'Procesando...' : '✦ Pagar con MercadoPago'}
            </button>

            <button
              onClick={clearCart}
              className="w-full mt-3 text-sm transition-colors"
              style={{ color: 'rgba(226,217,243,0.3)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f87171')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(226,217,243,0.3)')}
            >
              Vaciar carrito
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
