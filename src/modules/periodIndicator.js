import { npTimePeriods } from "./npTimePeriods.js";
import { to24Hour, isInRange } from "./timeHelpers.js";
import { bgImages } from "./bgImages.js";

const periodToImageIndex = {};
npTimePeriods.forEach(([period], i) => {
  periodToImageIndex[period] = i % bgImages.length;
});

let lastTimePeriod = null;

export function setNepaliTimePeriodIndicator(widgetTime) {
  const indicator = document.getElementById("np-time-period-indicator");
  if (!indicator) return;

  const timeMatch = widgetTime.match(/^(\d{1,2}:\d{2})\s*([AP]M)$/i);
  if (!timeMatch) {
    indicator.textContent = "";
    lastTimePeriod = null;
    return;
  }

  const [_, hhmm, ampm] = timeMatch;
  const [hour, min] = to24Hour(hhmm, ampm);

  for (const [np, range] of npTimePeriods) {
    const [start, end] = range.split("–");
    if (isInRange(hour, min, start, end)) {
      if (lastTimePeriod !== np) {
        indicator.textContent = np;
        document.body.style.backgroundImage = `url('${
          bgImages[periodToImageIndex[np]]
        }')`;
        lastTimePeriod = np;
      }
      return;
    }
  }
  indicator.textContent = "";
  lastTimePeriod = null;
}
