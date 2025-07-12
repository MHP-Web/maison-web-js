//LISTING DETAILS PAGE ANIMATION
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);
gsap.config({
  force3D: true,
});
CustomEase.create("listing-content", "M0,0 C0.84,0 0.16,1 1,1 ");

document.addEventListener("DOMContentLoaded", function () {
  const listingContent = document.querySelectorAll(
    "[data-element='listing-content']"
  );
  const listingImages = document.querySelectorAll(
    "[data-element='listing-image']"
  );

  gsap.set([...listingContent], {
    opacity: 0,
    yPercent: 40,
  });

  function initializeContentAnimation() {
    gsap.timeline().to([...listingContent], {
      stagger: 0.1,
      opacity: 1,
      yPercent: 0,
      ease: "listing-content",
    });
  }

  function initializeImageParallaxAnimation() {
    [...listingImages].forEach((img) => {
      gsap.timeline().to(img, {
        y: -60,
        startAt: {
          y: 0,
        },
        duration: 1,
        ease: "lerp",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    });
  }

  window.onPreloaderComplete(() => {
    initializeImageParallaxAnimation();
    initializeContentAnimation();
  });
});
