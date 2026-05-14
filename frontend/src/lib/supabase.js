import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function mediaUrl(path) {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/media/${clean}`;
}
