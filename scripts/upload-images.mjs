import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, extname } from 'path';
import { lookup } from 'mime-types';

const SUPABASE_URL = 'https://jahqnwrvkntiyhrdkxem.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = 'media';
const PUBLIC_DIR = new URL('../frontend/public', import.meta.url).pathname;

const SKIP_FILES = ['.txt', '.svg'];

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

function getAllFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) return getAllFiles(fullPath);
    if (SKIP_FILES.includes(extname(entry.name).toLowerCase())) return [];
    return [fullPath];
  });
}

async function uploadAll() {
  const files = getAllFiles(PUBLIC_DIR);
  console.log(`Subiendo ${files.length} archivos al bucket "${BUCKET}"...\n`);

  let ok = 0;
  let fail = 0;

  for (const filePath of files) {
    const storagePath = relative(PUBLIC_DIR, filePath);
    const mimeType = lookup(filePath) || 'application/octet-stream';
    const fileBuffer = readFileSync(filePath);

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, { contentType: mimeType, upsert: true });

    if (error) {
      console.error(`✗ ${storagePath} — ${error.message}`);
      fail++;
    } else {
      console.log(`✓ ${storagePath}`);
      ok++;
    }
  }

  console.log(`\nListo: ${ok} subidos, ${fail} errores.`);
}

uploadAll();
