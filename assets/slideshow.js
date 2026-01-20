(() => {
  // Update these image paths + alt text to match your files
  const slides = [
    { src: "assets/TheOldHouse_2.jpg", alt: "The Old House venue photo 2" },
    { src: "assets/TheOldHouse_3.jpg", alt: "The Old House venue photo 3" },
    { src: "assets/TheOldHouse_4.jpg", alt: "The Old House venue photo 4" },
    { src: "assets/TheOldHouse_1.jpg", alt: "The Old House venue photo 1" },
  ];

  const img = document.querySelector(".slide-img");
  const dotsWrap = document.querySelector(".slide-dots");
  const prevBtn = document.querySelector(".slide-btn.prev");
  const nextBtn = document.querySelector(".slide-btn.next");
  const viewport = document.querySelector(".slide-viewport");

  if (!img || !dotsWrap || !prevBtn || !nextBtn || !viewport) return;

  let index = 0;
  let startX = null;

  function renderDots() {
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "slide-dot" + (i === index ? " active" : "");
      b.setAttribute("aria-label", `Go to photo ${i + 1}`);
      b.addEventListener("click", () => {
        index = i;
        show();
      });
      dotsWrap.appendChild(b);
    });
  }

  function show() {
    const s = slides[index];
    img.src = s.src;
    img.alt = s.alt;
    renderDots();
  }

  function next() {
    index = (index + 1) % slides.length;
    show();
  }

  function prev() {
    index = (index - 1 + slides.length) % slides.length;
    show();
  }

  // Buttons
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  // Swipe support (mobile)
  viewport.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
  }, { passive: true });

  viewport.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    startX = null;

    // threshold so tiny touches don't trigger
    if (Math.abs(diff) < 35) return;
    if (diff < 0) next();
    else prev();
  }, { passive: true });

  // Initial render
  show();
})();
