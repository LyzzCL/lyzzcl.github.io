const root = document.documentElement;
const MIN_LOADER_TIME = 800;

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

async function waitForMainImages() {
  const main = document.querySelector("main");

  if (!main) return;

  const images = [...main.querySelectorAll("img")];

  await Promise.allSettled(
    images.map((image) => {
      if (image.complete && image.naturalWidth > 0) {
        return Promise.resolve();
      }

      if (image.decode) {
        return image.decode().catch(() => {});
      }

      return new Promise((resolve) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      });
    }),
  );
}

async function finishMainLoading(startTime) {
  await waitForMainImages();

  await new Promise(resolve => requestAnimationFrame(resolve));

  const elapsed = performance.now() - startTime;
  const remainingTime = Math.max(0, MIN_LOADER_TIME - elapsed);

  window.setTimeout(() => {
    root.classList.remove("is-main-loading");
    root.classList.remove("is-main-navigating");
  }, remainingTime);
}

const pageLoadStart = performance.now();

window.addEventListener("pageshow", () => {
  finishMainLoading(pageLoadStart);
});

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
