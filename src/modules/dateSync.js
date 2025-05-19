import { toDevanagari } from './toDevanagari';
import { setNepaliTimePeriodIndicator } from './periodIndicator';

// Copy content from srcId to destId
function copyText(srcId, destId) {
  const src = document.getElementById(srcId);
  const dest = document.getElementById(destId);
  if (src && dest) dest.textContent = src.textContent;
}

// Sync date fields
export function updateDates() {
  copyText('np-day-en', 'custom-day-en');
  copyText('np-day-date', 'custom-day-date');
  copyText('np-day-month', 'custom-day-month');
  copyText('np-day-day', 'custom-day-day');
  copyText('np-day-ns', 'custom-np-day-ns');
}

export function startTimeSync() {
  const timeSrc = document.getElementById('np-day-time');
  const timeDest = document.getElementById('custom-np-day-time');
  const secondDest = document.getElementById('custom-np-day-second');

  const updateTimeWithSeconds = () => {
    if (!timeSrc || !timeDest || !secondDest) return;
    const widgetTime = timeSrc.textContent.trim();
    const timeMatch = widgetTime.match(/^(\d{1,2}:\d{2})\s*([AP]M)$/i);

    if (timeMatch) {
      const [_, hhmm, ampm] = timeMatch;
      const now = new Date();
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const devTime = toDevanagari(hhmm);
      const devSeconds = toDevanagari(`:${seconds} ${ampm}`);
      if (timeDest.textContent !== devTime) timeDest.textContent = devTime;
      if (secondDest.textContent !== devSeconds)
        secondDest.textContent = devSeconds;
    } else {
      const devTime = toDevanagari(widgetTime);
      if (timeDest.textContent !== devTime) timeDest.textContent = devTime;
      if (secondDest.textContent !== '') secondDest.textContent = '';
    }
    setNepaliTimePeriodIndicator(widgetTime);
  };

  updateTimeWithSeconds();
  setInterval(updateTimeWithSeconds, 1000);
}
