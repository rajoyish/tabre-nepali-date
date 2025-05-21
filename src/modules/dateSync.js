// src/modules/timeSync.js

import { toDevanagari } from "./toDevanagari.js";
import { setNepaliTimePeriodIndicator } from "./periodIndicator.js";

// --- Helper logic for seconds since widget minute change ---
let lastWidgetMinute = null;
let minuteChangeTimestamp = null;

/**
 * Tracks the widget's minute and returns { hh, mm, ampm, seconds }
 * or null if the widget time is invalid.
 * @param {string} widgetTime - e.g. "12:34 PM"
 * @returns {object|null}
 */
function getSecondsSinceWidgetMinute(widgetTime) {
  const timeMatch = widgetTime.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (!timeMatch) {
    lastWidgetMinute = null;
    minuteChangeTimestamp = null;
    return null;
  }

  const [_, hh, mm, ampm] = timeMatch;
  const currentWidgetMinute = `${hh}:${mm} ${ampm}`;

  // Detect minute change
  if (currentWidgetMinute !== lastWidgetMinute) {
    lastWidgetMinute = currentWidgetMinute;
    minuteChangeTimestamp = Date.now();
  }

  // Calculate seconds since minute change
  let seconds = 0;
  if (minuteChangeTimestamp) {
    seconds = Math.floor((Date.now() - minuteChangeTimestamp) / 1000);
    if (seconds > 59) seconds = 59; // Clamp to 59
  }
  return { hh, mm, ampm, seconds };
}

// --- Existing code ---

// Copy content from srcId to destId
function copyText(srcId, destId) {
  const src = document.getElementById(srcId);
  const dest = document.getElementById(destId);
  if (src && dest) dest.textContent = src.textContent;
}

// Sync date fields
export function updateDates() {
  copyText("np-day-en", "custom-day-en");
  copyText("np-day-date", "custom-day-date");
  copyText("np-day-month", "custom-day-month");
  copyText("np-day-day", "custom-day-day");
  copyText("np-day-ns", "custom-np-day-ns");
}

export function startTimeSync() {
  const timeSrc = document.getElementById("np-day-time");
  const timeDest = document.getElementById("custom-np-day-time");
  const secondDest = document.getElementById("custom-np-day-second");

  const updateTimeWithSeconds = () => {
    if (!timeSrc || !timeDest || !secondDest) return;
    const widgetTime = timeSrc.textContent.trim();
    const result = getSecondsSinceWidgetMinute(widgetTime);

    if (result) {
      const { hh, mm, ampm, seconds } = result;
      const devTime = toDevanagari(`${hh}:${mm}`);
      const devSeconds = toDevanagari(
        `:${seconds.toString().padStart(2, "0")} ${ampm}`
      );
      if (timeDest.textContent !== devTime) timeDest.textContent = devTime;
      if (secondDest.textContent !== devSeconds)
        secondDest.textContent = devSeconds;
    } else {
      const devTime = toDevanagari(widgetTime);
      if (timeDest.textContent !== devTime) timeDest.textContent = devTime;
      if (secondDest.textContent !== "") secondDest.textContent = "";
    }
    setNepaliTimePeriodIndicator(widgetTime);
  };

  updateTimeWithSeconds();
  setInterval(updateTimeWithSeconds, 1000);
}
