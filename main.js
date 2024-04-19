document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.getElementById("btnPrevious");
  const nextBtn = document.getElementById("btnNext");
  const container = document.querySelector("main > div");
  // For scroll navigation
  prevBtn.addEventListener("click", function () {
    container.scrollBy(-container.offsetWidth, 0);
  });

  nextBtn.addEventListener("click", function () {
    container.scrollBy(container.offsetWidth, 0);
  });

  // Video Loading on desktop
  const video = document.getElementById("bgVideo");

  const screenWidth = window.innerWidth;
  const isDesktop = screenWidth >= 768;

  if (isDesktop) {
    video.querySelector("source").src = "./assets/vids/bg.webm";
    video.load();
  }
});
