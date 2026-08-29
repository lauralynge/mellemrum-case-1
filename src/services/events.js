import { SUPABASE_URL, headers } from "../supabaseClient";

export async function getEvents() {
  const response = await fetch(`${SUPABASE_URL}/events?order=date.asc`, {
    headers,
  });
  return response.json();
}

export async function getEventById(eventId) {
  const response = await fetch(`${SUPABASE_URL}/events?id=eq.${eventId}`, {
    headers,
  });
  const data = await response.json();
  return data[0];
}
