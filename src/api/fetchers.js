const API = import.meta.env.VITE_API_URL;

export async function getForm(id) {
  const res = await fetch(`${API}/form/${id}`);
  return await res.json();
}
