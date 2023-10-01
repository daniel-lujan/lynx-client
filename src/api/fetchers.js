import axios from "axios";

const fetcher = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function getForm(id) {
  const { data } = await fetcher.get(`/form/${id}`);
  return data;
}

export async function postForm(userResponse) {
  const { data } = await fetcher.post("/form", userResponse);
  return data;
}
