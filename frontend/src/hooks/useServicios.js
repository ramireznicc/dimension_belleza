import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useServicios() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    const { data: cats, error: catsErr } = await supabase
      .from('categorias')
      .select('*')
      .order('orden');

    if (catsErr) { setError(catsErr.message); setLoading(false); return; }

    const { data: servs, error: servsErr } = await supabase
      .from('servicios')
      .select('*')
      .eq('activo', true)
      .order('orden');

    if (servsErr) { setError(servsErr.message); setLoading(false); return; }

    const merged = cats.map((cat) => ({
      ...cat,
      servicios: servs.filter((s) => s.categoria_id === cat.id),
    }));

    setCategorias(merged);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  return { categorias, loading, error, refetch: fetchData };
}

export function useServiciosAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    const { data: cats, error: catsErr } = await supabase
      .from('categorias')
      .select('*')
      .order('orden');

    if (catsErr) { setError(catsErr.message); setLoading(false); return; }

    const { data: servs, error: servsErr } = await supabase
      .from('servicios')
      .select('*')
      .order('orden');

    if (servsErr) { setError(servsErr.message); setLoading(false); return; }

    const merged = cats.map((cat) => ({
      ...cat,
      servicios: servs.filter((s) => s.categoria_id === cat.id),
    }));

    setCategorias(merged);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  return { categorias, loading, error, refetch: fetchData };
}
