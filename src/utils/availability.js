
// Under denne andel (eller dette antal, alt efter hvad der er størst)
// regnes der som "få pladser tilbage"
const LOW_AVAILABILITY_RATIO = 0.2;
const LOW_AVAILABILITY_MIN = 3;

export function getAvailabilityStatus(availableSpots, capacity) {
  if (availableSpots <= 0) {
    return { label: "Udsolgt", className: "soldOut" };
  }

  const lowThreshold = Math.max(
    LOW_AVAILABILITY_MIN,
    Math.round(capacity * LOW_AVAILABILITY_RATIO),
  );

  if (availableSpots <= lowThreshold) {
    return { label: "Få pladser tilbage", className: "lowAvailability" };
  }

  return { label: "Masser af plads", className: "plentyAvailability" };
}
