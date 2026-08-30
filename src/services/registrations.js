import { SUPABASE_URL, headers } from "../supabaseClient";

export async function getRegistrations() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/registrations?order=createdAt.desc`,
      { headers },
    );
    if (!response.ok) {
      throw new Error(
        `Kunne ikke hente tilmeldinger (status ${response.status})`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Fejl ved hentning af tilmeldinger:", error);
    throw error;
  }
}
