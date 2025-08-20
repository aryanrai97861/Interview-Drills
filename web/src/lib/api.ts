// @ts-ignore - loose helper
export async function apiFetch(path: any, opts: any = {}) {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const res = await fetch(base + path, { ...opts, credentials: 'include', headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) } });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw json || { error: { code: res.status, message: res.statusText } };
  return json;
}
