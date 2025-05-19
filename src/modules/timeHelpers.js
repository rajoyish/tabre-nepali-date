// Convert 12-hour time to 24-hour
export function to24Hour(hhmm, ampm) {
  let [h, m] = hhmm.split(':').map(Number);
  if (ampm.toUpperCase() === 'PM' && h !== 12) h += 12;
  if (ampm.toUpperCase() === 'AM' && h === 12) h = 0;
  return [h, m];
}

// Check if time is in range
export function isInRange(hour, min, start, end) {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  if (sh > eh || (sh === eh && sm > em)) {
    // Overnight
    return (
      hour > sh ||
      (hour === sh && min >= sm) ||
      hour < eh ||
      (hour === eh && min < em)
    );
  } else {
    return (
      (hour > sh || (hour === sh && min >= sm)) &&
      (hour < eh || (hour === eh && min < em))
    );
  }
}
