// src/modules/nepaliPatroWidget.js

const WIDGET_SCRIPT_URL =
  "https://nepalipatro.com.np/np-widgets/nepalipatro.js";

function loadNepaliPatroScript() {
  return new Promise((resolve, reject) => {
    if (document.getElementById("wiz1")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = WIDGET_SCRIPT_URL;
    script.async = true;
    script.id = "wiz1";
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

/**
 * Injects the Nepali Patro widget into a container.
 * @param {string} containerId - The id of the container div.
 * @param {string} widgetType - The widget type (e.g., 'day').
 */
export async function mountNepaliPatroWidget(containerId, widgetType = "day") {
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    document.body.appendChild(container);
  }
  container.setAttribute("widget", widgetType);

  await loadNepaliPatroScript();
}
