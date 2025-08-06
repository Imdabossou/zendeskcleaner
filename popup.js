document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("toggleCleanup");

  chrome.storage.local.get("autoCleanupEnabled", function (result) {
    toggle.checked = result.autoCleanupEnabled === true;
  });

  toggle.addEventListener("change", function () {
    chrome.storage.local.set({ autoCleanupEnabled: toggle.checked });
  });
});