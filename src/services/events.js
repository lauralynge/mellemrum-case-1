import { SUPABASE_URL, headers } from "../supabaseClient";

export async function getEvents() {
  try {
    const response = await fetch(`${SUPABASE_URL}/events?order=date.asc`, {
      headers,
    });
    if (!response.ok) {
      throw new Error(`Kunne ikke hente events (status ${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fejl ved hentning af events:", error);
    throw error;
  }
}

export async function getEventById(eventId) {
  try {
    const response = await fetch(`${SUPABASE_URL}/events?id=eq.${eventId}`, {
      headers,
    });
    if (!response.ok) {
      throw new Error(`Kunne ikke hente event (status ${response.status})`);
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Fejl ved hentning af event:", error);
    throw error;
  }
}