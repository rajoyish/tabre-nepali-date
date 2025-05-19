import './style.css';
import '@fontsource-variable/anek-devanagari';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { updateDates, startTimeSync } from './modules/dateSync';

document.addEventListener('DOMContentLoaded', () => {
  const widget = document.getElementById('np_widget_wiz1');
  if (!widget) return;

  if (widget.querySelector('.np-today-box')) {
    updateDates();
    startTimeSync();
  } else {
    const observer = new MutationObserver(() => {
      if (widget.querySelector('.np-today-box')) {
        updateDates();
        startTimeSync();
        observer.disconnect();
      }
    });
    observer.observe(widget, { childList: true, subtree: true });
  }
});
