chrome.storage.local.get("autoCleanupEnabled", function (result) {
  if (!result.autoCleanupEnabled) return;

  const observer = new MutationObserver(() => {
    const sections = document.querySelectorAll('div[style*="page: WordSection1;"]');

    // If there's more than one section, we can safely assume it's a thread with replies.
    // In this case, the initial message does not have WordSection1, so all found sections are replies.
    // If there is only one (or zero) section, it's a single-message ticket and we should not touch it.
    if (sections.length > 1) {
      sections.forEach(section => {
        let borderFound = false;
        const descendants = Array.from(section.querySelectorAll('*'));

        for (let i = 0; i < descendants.length; i++) {
          const el = descendants[i];

          if (
            el.tagName === 'DIV' &&
            el.getAttribute('style') &&
            el.getAttribute('style').includes('border-top-width: 1.0pt') &&
            el.getAttribute('style').includes('border-top-color: #E1E1E1')
          ) {
            borderFound = true;
            continue; // Skip the border element itself
          }

          if (borderFound && el.parentElement) {
            el.remove();
          }
        }
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
