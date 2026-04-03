import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { productos } from '../data/productos';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const categorias = ['todas', 'facial', 'capilar', 'corporal'];

const formatPrecio = (precio) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(precio);

const ICONS = { facial: '✨', capilar: '💆', corporal: '🌸' };

export default function Tienda() {
  const { addItem } = useCart();
  const [filtro, setFiltro] = useState('todas');
  const [agregados, setAgregados] = useState({});

  const lista = filtro === 'todas' ? productos : productos.filter((p) => p.categoria === filtro);

  const handleAgregar = (producto) => {
    addItem(producto);
    setAgregados((prev) => ({ ...prev, [producto.id]: true }));
    setTimeout(() => setAgregados((prev) => ({ ...prev, [producto.id]: false })), 1500);
  };

  return (
    <div className="section-purple flex-1">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-medium mb-4 font-heading">
            <span className="gradient-text">Tienda</span>
          </h1>
          <p style={{ color: 'rgba(226,217,243,0.55)' }}>
            Productos seleccionados para el cuidado profesional en casa.
          </p>
        </motion.div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-250"
              style={
                filtro === cat
                  ? {
                      background: 'linear-gradient(135deg, #ff2da0, #c026d3)',
                      color: 'white',
                      boxShadow: '0 0 16px rgba(255,45,160,0.4)',
                    }
                  : {
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(226,217,243,0.6)',
                    }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          {lista.map((producto, i) => (
            <motion.div
              key={producto.id}
              className="space-card overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              layout
            >
              {/* Imagen placeholder */}
              <div
                className="h-44 flex items-center justify-center text-5xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,45,160,0.2) 0%, rgba(192,38,211,0.15) 100%)',
                  borderBottom: '1px solid rgba(255,45,160,0.1)',
                }}
              >
                {ICONS[producto.categoria] || '🧴'}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <span
                  className="text-xs font-semibold uppercase tracking-wide mb-1 capitalize"
                  style={{ color: '#ff82c5' }}
                >
                  {producto.categoria}
                </span>
                <h3 className="font-medium text-lg mb-1 font-heading" style={{ color: '#e2d9f3' }}>
                  {producto.nombre}
                </h3>
                <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'rgba(226,217,243,0.5)' }}>
                  {producto.descripcion}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-extrabold gradient-text">{formatPrecio(producto.precio)}</span>
                  <button
                    onClick={() => handleAgregar(producto)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                    style={
                      agregados[producto.id]
                        ? { background: '#22c55e', color: 'white' }
                        : {
                            background: 'linear-gradient(135deg, #ff2da0, #c026d3)',
                            color: 'white',
                            boxShadow: '0 0 14px rgba(255,45,160,0.35)',
                          }
                    }
                  >
                    {agregados[producto.id] ? (
                      <><Check size={15} /> Agregado</>
                    ) : (
                      <><ShoppingCart size={15} /> Agregar</>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {lista.length === 0 && (
          <p className="text-center py-16" style={{ color: 'rgba(226,217,243,0.3)' }}>
            No hay productos en esta categoría.
          </p>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/carrito"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: '#ff2da0' }}
          >
            <ShoppingCart size={17} /> Ver mi carrito
          </Link>
        </div>
      </div>
    </div>
  );
}
