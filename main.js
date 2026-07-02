const root = document.documentElement;

function getInternalNavigationUrl(link) {
  if (!link) return null;

  const url = new URL(link.href, window.location.href);

  const isInternal = url.origin === window.location.origin;
  const isSamePath = url.pathname === window.location.pathname;
  const isOnlyHashChange = isSamePath && url.hash;

  if (!isInternal) return null;
  if (isOnlyHashChange) return null;
  if (link.target === "_blank") return null;
  if (link.hasAttribute("download")) return null;

  return url;
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");

  const hasModifierKey =
    event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;

  if (hasModifierKey) return;

  const url = getInternalNavigationUrl(link);

  if (!url) return;

  event.preventDefault();

  window.location.href = url.href;
});

window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;

  if (
    reason instanceof DOMException &&
    reason.name === "AbortError" &&
    reason.message.includes("Transition was skipped")
  ) {
    event.preventDefault();
  }
});
