import { SUPABASE_URL, headers } from "../supabaseClient";

export async function getRegistrations() {
  const response = await fetch(
    `${SUPABASE_URL}/registrations?order=createdAt.desc`,
    { headers },
  );
  return response.json();
}
