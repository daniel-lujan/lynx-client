import axios from "axios";

const fetcher = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function getForm(id) {
  const { data } = await fetcher.get(`/form/${id}`);
  return data;
}

export async function postForm(userResponse) {
  userResponse.age = parseInt(userResponse.age);
  const { data } = await fetcher.post("/form", userResponse);
  return data;
}

export async function getResults(id) {
  const { data } = await fetcher.get(`/results/${id}`);
  return data;
}

export async function triggerCalc({ token }) {
  const { data } = await fetcher.get("/admin/calculate", {
    params: {
      token,
    },
  });
  return data;
}

export async function resetCalc({ token }) {
  const { data } = await fetcher.get("/admin/reset", {
    params: {
      token,
    },
  });
  return data;
}
