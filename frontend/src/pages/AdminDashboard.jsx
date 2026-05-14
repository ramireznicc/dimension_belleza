import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Pencil, Check, X, Upload, Eye, EyeOff, ImagePlus, Plus } from 'lucide-react';
import { signOut } from '../utils/auth';
import { supabase } from '../lib/supabase';
import { useServiciosAdmin } from '../hooks/useServicios';

const BUCKET = 'servicios';

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function uploadImage(file, servicioId) {
  const ext = file.name.split('.').pop();
  const path = `${servicioId}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function UploadZone({ onUpload, loading, label = 'Subir foto', fullWidth = false }) {
  const ref = useRef();
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => e.target.files[0] && onUpload(e.target.files[0])}
      />
      <button
        type="button"
        onClick={() => ref.current.click()}
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-xl font-semibold transition-all"
        style={{
          width: fullWidth ? '100%' : undefined,
          padding: '14px 20px',
          fontSize: '15px',
          background: loading ? 'rgba(129,140,248,0.06)' : 'rgba(129,140,248,0.12)',
          color: loading ? 'rgba(165,180,252,0.5)' : '#a5b4fc',
          border: '1px solid rgba(129,140,248,0.25)',
        }}
      >
        <Upload size={16} />
        {loading ? 'Subiendo...' : label}
      </button>
    </>
  );
}

const inputStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '12px',
  padding: '14px 16px',
  fontSize: '16px',
  color: '#e2d9f3',
  width: '100%',
  outline: 'none',
  WebkitAppearance: 'none',
};

function ServiceCard({ servicio, onSaved }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    titulo: servicio.titulo,
    precio: servicio.precio,
    descripcion: servicio.descripcion,
    imagen: servicio.imagen,
    imagenes: servicio.imagenes || [],
  });
  const [saving, setSaving] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toggling, setToggling] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('servicios')
      .update({
        titulo: form.titulo,
        precio: form.precio,
        descripcion: form.descripcion,
        imagen: form.imagen,
        imagenes: form.imagenes,
      })
      .eq('id', servicio.id);
    setSaving(false);
    if (!error) {
      setSaved(true);
      setEditing(false);
      onSaved();
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setForm({
      titulo: servicio.titulo,
      precio: servicio.precio,
      descripcion: servicio.descripcion,
      imagen: servicio.imagen,
      imagenes: servicio.imagenes || [],
    });
  };

  const handleToggleActivo = async () => {
    setToggling(true);
    await supabase.from('servicios').update({ activo: !servicio.activo }).eq('id', servicio.id);
    setToggling(false);
    onSaved();
  };

  const handleUploadMain = async (file) => {
    setUploadingMain(true);
    try {
      const url = await uploadImage(file, servicio.id);
      setForm((f) => ({ ...f, imagen: url }));
    } catch (e) {
      alert('Error al subir la imagen: ' + e.message);
    }
    setUploadingMain(false);
  };

  const handleUploadGallery = async (file) => {
    setUploadingGallery(true);
    try {
      const url = await uploadImage(file, servicio.id);
      setForm((f) => ({ ...f, imagenes: [...f.imagenes, url] }));
    } catch (e) {
      alert('Error al subir la imagen: ' + e.message);
    }
    setUploadingGallery(false);
  };

  const removeGalleryImage = (idx) => {
    setForm((f) => ({ ...f, imagenes: f.imagenes.filter((_, i) => i !== idx) }));
  };

  const isInactive = !servicio.activo;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${isInactive ? 'rgba(255,255,255,0.05)' : editing ? 'rgba(255,45,160,0.35)' : 'rgba(255,255,255,0.08)'}`,
        opacity: isInactive && !editing ? 0.55 : 1,
        transition: 'opacity 0.2s, border-color 0.2s',
      }}
    >
      {/* Vista colapsada */}
      {!editing && (
        <div className="flex items-center gap-3 p-4">
          {/* Thumbnail */}
          <div
            className="shrink-0 rounded-xl overflow-hidden"
            style={{ width: 56, height: 56, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {servicio.imagen ? (
              servicio.imagen.endsWith('.mp4') ? (
                <video src={servicio.imagen} className="w-full h-full object-cover" muted playsInline />
              ) : (
                <img src={servicio.imagen} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ color: 'rgba(226,217,243,0.15)' }}>
                <ImagePlus size={18} />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm font-heading truncate" style={{ color: '#e2d9f3' }}>
              {servicio.titulo}
            </p>
            <p className="text-xs mt-0.5 truncate" style={{ color: servicio.precio ? 'rgba(255,130,197,0.8)' : 'rgba(226,217,243,0.25)' }}>
              {servicio.precio || 'Sin precio'}
            </p>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleToggleActivo}
              disabled={toggling}
              className="flex items-center justify-center rounded-xl"
              style={{
                width: 44, height: 44,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: servicio.activo ? 'rgba(226,217,243,0.4)' : '#ff82c5',
              }}
            >
              {servicio.activo ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>

            <button
              onClick={() => setEditing(true)}
              className="flex items-center justify-center gap-1.5 rounded-xl font-semibold text-sm"
              style={{
                height: 44,
                padding: '0 16px',
                background: saved ? 'rgba(34,197,94,0.15)' : 'rgba(255,45,160,0.12)',
                color: saved ? '#4ade80' : '#ff82c5',
                border: `1px solid ${saved ? 'rgba(34,197,94,0.3)' : 'rgba(255,45,160,0.3)'}`,
              }}
            >
              {saved ? <Check size={14} /> : <Pencil size={14} />}
              {saved ? 'Guardado' : 'Editar'}
            </button>
          </div>
        </div>
      )}

      {/* Formulario de edición */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {/* Header del form */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <span className="font-semibold font-heading text-sm" style={{ color: '#e2d9f3' }}>
                Editando
              </span>
              <button
                onClick={handleCancel}
                className="flex items-center justify-center rounded-xl"
                style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.06)', color: 'rgba(226,217,243,0.5)' }}
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 space-y-5">
              {/* Título */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(226,217,243,0.6)' }}>
                  Título
                </label>
                <input
                  type="text"
                  value={form.titulo}
                  onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(255,45,160,0.5)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                />
              </div>

              {/* Precio */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(226,217,243,0.6)' }}>
                  Precio
                </label>
                <input
                  type="text"
                  value={form.precio}
                  onChange={(e) => setForm((f) => ({ ...f, precio: e.target.value }))}
                  style={inputStyle}
                  placeholder="Ej: $50.000"
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(255,45,160,0.5)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(226,217,243,0.6)' }}>
                  Descripción
                </label>
                <textarea
                  rows={6}
                  value={form.descripcion}
                  onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.5' }}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(255,45,160,0.5)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                />
              </div>

              {/* Foto principal */}
              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: 'rgba(226,217,243,0.6)' }}>
                  Foto principal
                </label>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="rounded-xl overflow-hidden shrink-0"
                    style={{ width: 72, height: 72, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {form.imagen ? (
                      <img src={form.imagen} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ color: 'rgba(226,217,243,0.2)' }}>
                        <ImagePlus size={20} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <UploadZone onUpload={handleUploadMain} loading={uploadingMain} label="Cambiar foto" fullWidth />
                  </div>
                </div>
              </div>

              {/* Galería */}
              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: 'rgba(226,217,243,0.6)' }}>
                  Galería ({form.imagenes.length} {form.imagenes.length === 1 ? 'foto' : 'fotos'})
                </label>

                {form.imagenes.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-3">
                    {form.imagenes.map((url, idx) => (
                      <div key={idx} className="relative">
                        <div
                          className="rounded-xl overflow-hidden"
                          style={{ width: 80, height: 80, border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                          {url.endsWith('.mp4') ? (
                            <video src={url} className="w-full h-full object-cover" muted playsInline />
                          ) : (
                            <img src={url} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                          )}
                        </div>
                        <button
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute -top-2 -right-2 flex items-center justify-center rounded-full"
                          style={{ width: 24, height: 24, background: '#ff2da0', color: '#fff', border: '2px solid #020208' }}
                        >
                          <X size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <UploadZone
                  onUpload={handleUploadGallery}
                  loading={uploadingGallery}
                  label="Agregar foto a galería"
                  fullWidth
                />
              </div>

              {/* Botones */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 rounded-xl font-bold"
                  style={{
                    padding: '16px',
                    fontSize: '16px',
                    background: saving
                      ? 'rgba(34,197,94,0.3)'
                      : 'linear-gradient(135deg, rgba(34,197,94,0.3), rgba(34,197,94,0.2))',
                    color: '#4ade80',
                    border: '1px solid rgba(34,197,94,0.4)',
                    opacity: saving ? 0.7 : 1,
                  }}
                >
                  <Check size={18} />
                  {saving ? 'Guardando...' : 'Guardar cambios'}
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full rounded-xl font-semibold"
                  style={{
                    padding: '14px',
                    fontSize: '15px',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(226,217,243,0.45)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NuevoServicioForm({ categoriaId, ordenInicial, onSaved, onCancel }) {
  const [form, setForm] = useState({
    titulo: '',
    precio: '',
    descripcion: '',
    imagen: '',
    imagenes: [],
  });
  const [saving, setSaving] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!form.titulo.trim()) { setError('El título es obligatorio.'); return; }
    setSaving(true);
    setError('');

    const id = slugify(form.titulo) + '-' + Date.now();
    const { error: dbError } = await supabase.from('servicios').insert({
      id,
      categoria_id: categoriaId,
      titulo: form.titulo.trim(),
      precio: form.precio.trim(),
      descripcion: form.descripcion.trim(),
      imagen: form.imagen,
      imagenes: form.imagenes,
      activo: true,
      orden: ordenInicial,
    });

    setSaving(false);
    if (dbError) { setError(dbError.message); return; }
    onSaved();
  };

  const handleUploadMain = async (file) => {
    setUploadingMain(true);
    try {
      const tempId = 'nuevo-' + Date.now();
      const url = await uploadImage(file, tempId);
      setForm((f) => ({ ...f, imagen: url }));
    } catch (e) { alert('Error al subir la imagen: ' + e.message); }
    setUploadingMain(false);
  };

  const handleUploadGallery = async (file) => {
    setUploadingGallery(true);
    try {
      const tempId = 'nuevo-' + Date.now();
      const url = await uploadImage(file, tempId);
      setForm((f) => ({ ...f, imagenes: [...f.imagenes, url] }));
    } catch (e) { alert('Error al subir la imagen: ' + e.message); }
    setUploadingGallery(false);
  };

  const removeGalleryImage = (idx) => {
    setForm((f) => ({ ...f, imagenes: f.imagenes.filter((_, i) => i !== idx) }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: 'rgba(255,45,160,0.05)', border: '1px solid rgba(255,45,160,0.25)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid rgba(255,45,160,0.12)' }}
      >
        <span className="font-semibold font-heading text-sm" style={{ color: '#ff82c5' }}>
          Nuevo servicio
        </span>
        <button
          onClick={onCancel}
          className="flex items-center justify-center rounded-xl"
          style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.06)', color: 'rgba(226,217,243,0.5)' }}
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-4 space-y-5">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(226,217,243,0.6)' }}>
            Título <span style={{ color: '#ff82c5' }}>*</span>
          </label>
          <input
            type="text"
            value={form.titulo}
            onChange={(e) => { setForm((f) => ({ ...f, titulo: e.target.value })); setError(''); }}
            style={inputStyle}
            placeholder="Ej: Tinte completo"
            onFocus={(e) => { e.target.style.borderColor = 'rgba(255,45,160,0.5)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(226,217,243,0.6)' }}>Precio</label>
          <input
            type="text"
            value={form.precio}
            onChange={(e) => setForm((f) => ({ ...f, precio: e.target.value }))}
            style={inputStyle}
            placeholder="Ej: $60.000"
            onFocus={(e) => { e.target.style.borderColor = 'rgba(255,45,160,0.5)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(226,217,243,0.6)' }}>Descripción</label>
          <textarea
            rows={5}
            value={form.descripcion}
            onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.5' }}
            placeholder="Describí el servicio..."
            onFocus={(e) => { e.target.style.borderColor = 'rgba(255,45,160,0.5)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
          />
        </div>

        {/* Foto principal */}
        <div>
          <label className="block text-sm font-medium mb-3" style={{ color: 'rgba(226,217,243,0.6)' }}>Foto principal</label>
          <div className="flex items-center gap-3">
            <div
              className="rounded-xl overflow-hidden shrink-0"
              style={{ width: 72, height: 72, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {form.imagen ? (
                <img src={form.imagen} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ color: 'rgba(226,217,243,0.2)' }}>
                  <ImagePlus size={20} />
                </div>
              )}
            </div>
            <div className="flex-1">
              <UploadZone onUpload={handleUploadMain} loading={uploadingMain} label="Subir foto" fullWidth />
            </div>
          </div>
        </div>

        {/* Galería */}
        <div>
          <label className="block text-sm font-medium mb-3" style={{ color: 'rgba(226,217,243,0.6)' }}>
            Galería ({form.imagenes.length} {form.imagenes.length === 1 ? 'foto' : 'fotos'})
          </label>
          {form.imagenes.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-3">
              {form.imagenes.map((url, idx) => (
                <div key={idx} className="relative">
                  <div className="rounded-xl overflow-hidden" style={{ width: 80, height: 80, border: '1px solid rgba(255,255,255,0.1)' }}>
                    <img src={url} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                  <button
                    onClick={() => removeGalleryImage(idx)}
                    className="absolute -top-2 -right-2 flex items-center justify-center rounded-full"
                    style={{ width: 24, height: 24, background: '#ff2da0', color: '#fff', border: '2px solid #020208' }}
                  >
                    <X size={11} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <UploadZone onUpload={handleUploadGallery} loading={uploadingGallery} label="Agregar foto a galería" fullWidth />
        </div>

        {error && (
          <p className="text-sm rounded-xl px-4 py-3" style={{ color: '#ff82c5', background: 'rgba(255,45,160,0.1)', border: '1px solid rgba(255,45,160,0.2)' }}>
            {error}
          </p>
        )}

        {/* Botones */}
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 rounded-xl font-bold"
            style={{
              padding: '16px',
              fontSize: '16px',
              background: saving ? 'rgba(255,45,160,0.2)' : 'linear-gradient(135deg, #ff2da0, #c026d3)',
              color: '#fff',
              boxShadow: saving ? 'none' : '0 0 24px rgba(255,45,160,0.3)',
              opacity: saving ? 0.7 : 1,
            }}
          >
            <Plus size={18} />
            {saving ? 'Creando...' : 'Crear servicio'}
          </button>
          <button
            onClick={onCancel}
            className="w-full rounded-xl font-semibold"
            style={{
              padding: '14px',
              fontSize: '15px',
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(226,217,243,0.45)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { categorias, loading, error, refetch } = useServiciosAdmin();
  const [agregandoEn, setAgregandoEn] = useState(null);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

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
          background: 'rgba(2,2,8,0.92)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,45,160,0.12)',
        }}
      >
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/dimension_belleza_LOGO.svg"
              alt=""
              className="w-8"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255,45,160,0.3))' }}
            />
            <span className="font-semibold font-heading" style={{ color: 'rgba(226,217,243,0.85)', fontSize: '15px' }}>
              Administración
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl font-semibold"
            style={{
              padding: '10px 16px',
              fontSize: '14px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(226,217,243,0.5)',
            }}
          >
            <LogOut size={15} />
            Salir
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-2xl mx-auto px-4 py-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm mb-6" style={{ color: 'rgba(226,217,243,0.35)' }}>
            Tocá "Editar" en cualquier servicio para modificarlo.
          </p>

          {loading && (
            <div className="flex items-center justify-center py-24">
              <div className="w-7 h-7 rounded-full border-2 border-pink-500 border-t-transparent animate-spin" />
            </div>
          )}

          {error && (
            <div className="text-center py-20 text-sm rounded-2xl" style={{ color: '#ff82c5', background: 'rgba(255,45,160,0.08)', border: '1px solid rgba(255,45,160,0.15)' }}>
              Error al cargar: {error}
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-8">
              {categorias.map((cat) => (
                <div key={cat.id}>
                  <div className="flex items-center gap-3 mb-3">
                    <h2
                      className="font-semibold font-heading"
                      style={{
                        fontSize: '13px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        background: 'linear-gradient(135deg, #ff2da0, #c026d3)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {cat.titulo}
                    </h2>
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,45,160,0.25), transparent)' }} />
                  </div>
                  <div className="space-y-2">
                    {cat.servicios.map((s) => (
                      <ServiceCard key={s.id} servicio={s} onSaved={refetch} />
                    ))}

                    <AnimatePresence>
                      {agregandoEn === cat.id ? (
                        <NuevoServicioForm
                          key="nuevo"
                          categoriaId={cat.id}
                          ordenInicial={cat.servicios.length}
                          onSaved={() => { setAgregandoEn(null); refetch(); }}
                          onCancel={() => setAgregandoEn(null)}
                        />
                      ) : (
                        <motion.button
                          key="btn-nuevo"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onClick={() => setAgregandoEn(cat.id)}
                          className="w-full flex items-center justify-center gap-2 rounded-2xl font-semibold"
                          style={{
                            padding: '14px',
                            fontSize: '14px',
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px dashed rgba(255,255,255,0.12)',
                            color: 'rgba(226,217,243,0.35)',
                          }}
                        >
                          <Plus size={15} />
                          Nuevo servicio en {cat.titulo}
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
