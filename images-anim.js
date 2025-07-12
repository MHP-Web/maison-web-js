// IMAGES ANIMATION
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
gsap.config({
  force3D: true,
});

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".anim-img-scale-down");
  images.forEach((image) => {
    gsap.set(image, {
      scale: 1.5,
    });
  });

  function initializeImageScaleDownAnimation() {
    images.forEach((image) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          start: "top 90%",
          end: "center center",
          trigger: image,
        },
      });
      tl.to(image, {
        scale: 1.3,
        ease: "image-scale-down",
        duration: 2,
      });
    });
  }

  window.onPreloaderComplete(() => {
    initializeImageScaleDownAnimation();
  });
});
