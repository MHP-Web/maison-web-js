document.addEventListener("DOMContentLoaded", () => {
    initialiseLenisScroll();
    function initialiseLenisScroll() {
      window.maisohHillsLenis = new Lenis({
        smoothWheel: true,
        duration: 2.5, // Increased from 1.2 (higher = heavier/slower)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom heavy easing
        wheelMultiplier: 0.7, // Reduce scroll sensitivity (lower = heavier)
        touchMultiplier: 0.8, // Reduce touch scroll speed
        infinite: false,
      });
      maisohHillsLenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        maisohHillsLenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  });
  