//GALLERY DETAILS PAGE ANIMATION
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  const potraitImages = document.querySelectorAll(
    "[data-element='gallery-img-potrait']"
  );
  const fullScreenImages = document.querySelectorAll(
    "[data-element='gallery-img-fullscreen']"
  );
  const landscapeImages = document.querySelectorAll(
    "[data-element='gallery-img-landscape']"
  );

  function initializeImageParallaxAnimation() {
    [...potraitImages].forEach((img) => {
      gsap.timeline().to(img, {
        y: -120,
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
    [...fullScreenImages].forEach((img) => {
      gsap.timeline().to(img, {
        y: -120,
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
    [...potraitImages, ...fullScreenImages, ...landscapeImages].forEach(
      (img) => {
        gsap.timeline().to(img, {
          y: -20,
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
      }
    );
  }

  window.onPreloaderComplete(() => {
    initializeImageParallaxAnimation();
  });
});
