export function getAvailableSpots(event) {
  const registeredCount = event.registrations?.[0]?.count ?? 0;
  return event.capacity - registeredCount;
}

export function getRegisteredCount(event) {
  return event.registrations?.[0]?.count ?? 0;
}
