document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.getElementById("btnPrevious");
  const nextBtn = document.getElementById("btnNext");
  const container = document.querySelector("main > div");
  const indicators = document.querySelectorAll("main > ul > li");

  let currentIndex = 0;

  function updateIndicator() {
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.style.color = "var(--primary-color)";
      } else {
        indicator.style.color = "var(--primary-warm-color)";
      }
    });
  }

  // For scroll navigation
  prevBtn.addEventListener("click", function () {
    container.scrollBy(-container.offsetWidth, 0);
    currentIndex = Math.max(currentIndex - 1, 0);
    updateIndicator();
  });

  nextBtn.addEventListener("click", function () {
    container.scrollBy(container.offsetWidth, 0);
    currentIndex = Math.min(currentIndex + 1, indicators.length - 1);
    updateIndicator();
  });

  // Video Loading
  const video = document.getElementById('bgVideo');

  const screenWidth = window.innerWidth;
  const isDesktop = screenWidth>=768;

  if (isDesktop) {
    video.querySelector("source").src = "./assets/vids/bg.webm";
    video.load();
  }

});
