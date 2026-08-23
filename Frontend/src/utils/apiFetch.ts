import { supabase } from "./supabase";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(session && { Authorization: `Bearer ${session.access_token}` }),
      ...options?.headers,
    },
  });

  const json = await response.json();

  if (json.status === "error") {
    throw new Error(json.message);
  }

  return json.data;
}
