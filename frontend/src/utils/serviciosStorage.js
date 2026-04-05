const STORAGE_KEY = 'db_servicios_overrides';

export function getOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveOverride(id, fields) {
  const overrides = getOverrides();
  overrides[id] = { ...overrides[id], ...fields };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

export function mergeWithOverrides(categorias) {
  const overrides = getOverrides();
  return categorias.map((cat) => ({
    ...cat,
    servicios: cat.servicios.map((s) =>
      overrides[s.id] ? { ...s, ...overrides[s.id] } : s
    ),
  }));
}
