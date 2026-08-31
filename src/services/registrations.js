import { SUPABASE_URL, headers } from "../supabaseClient";

/* Hent alle tilmeldinger */
export async function getRegistrations() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/registrations?select=*,events(title,date,venueName)&order=createdAt.desc`,
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

/* Opret ny tilmelding */
export async function createRegistration({ name, email, eventId }) {
  try {
    const response = await fetch(`${SUPABASE_URL}/registrations`, {
      method: "POST",
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        name,
        email,
        eventId,
        status: "Ny",
      }),
    });
    if (!response.ok) {
      throw new Error(
        `Kunne ikke oprette tilmelding (status ${response.status})`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Fejl ved oprettelse af tilmelding:", error);
    throw error;
  }
}
