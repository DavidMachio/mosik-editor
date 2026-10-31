// Llamadas a la API propia (/api). Lanza un Error con { status, fields } si la respuesta no es correcta.
export async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(path, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'same-origin',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw Object.assign(new Error(data.error || 'Algo ha salido mal. Inténtalo de nuevo.'), {
      status: res.status,
      fields: data.fields || {},
    });
  }
  return data;
}
