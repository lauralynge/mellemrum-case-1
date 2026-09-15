export function getAvailableSpots(event, registeredCount) {
  const count = registeredCount ?? event.registrations?.[0]?.count ?? 0;
  return event.capacity - count;
}

export function getRegisteredCount(event) {
  return event.registrations?.[0]?.count ?? 0;
}
