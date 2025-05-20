import "./style.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { updateDates, startTimeSync } from "./modules/dateSync.js";
import { mountNepaliPatroWidget } from "./modules/nepaliPatroWidget.js";

// Mount the widget before DOMContentLoaded logic
mountNepaliPatroWidget("np_widget_wiz1", "day");

document.addEventListener("DOMContentLoaded", () => {
  const widget = document.getElementById("np_widget_wiz1");
  if (!widget) return;

  if (widget.querySelector(".np-today-box")) {
    updateDates();
    startTimeSync();
  } else {
    const observer = new MutationObserver(() => {
      if (widget.querySelector(".np-today-box")) {
        updateDates();
        startTimeSync();
        observer.disconnect();
      }
    });
    observer.observe(widget, { childList: true, subtree: true });
  }
});
