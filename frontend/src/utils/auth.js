const SESSION_KEY = 'db_admin_session';

export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function checkCredentials(user, pass) {
  const storedUser = import.meta.env.VITE_ADMIN_USER;
  const storedHash = import.meta.env.VITE_ADMIN_PASS_HASH;
  if (!storedUser || !storedHash) return false;
  const hash = await hashPassword(pass);
  return user === storedUser && hash === storedHash;
}

export function setSession() {
  sessionStorage.setItem(SESSION_KEY, '1');
}

export function getSession() {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
