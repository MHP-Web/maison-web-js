window.PRELOADER_COMPLETE = false;
window.PRELOADER_CALLBACKS = [];
window.onPreloaderComplete = function (callback) {
  if (window.PRELOADER_COMPLETE) {
    callback();
  } else {
    window.PRELOADER_CALLBACKS.push(callback);
  }
};
window.addEventListener("load", function () {
  const preloader = document.querySelector(".preloader");
  const strips = preloader
    ? preloader.querySelectorAll(".preloader_strip")
    : [];
  if (!preloader || strips.length === 0) {
    window.PRELOADER_COMPLETE = true;
    window.PRELOADER_CALLBACKS.forEach((cb) => cb());
    return;
  }
  gsap.to(strips, {
    // width: 0,
    rotateY: 90,
    autoAlpha: 0,
    duration: 0.8,
    ease: "power3.inOut",
    // stagger: 0.08,
    onComplete: function () {
      preloader.style.display = "none";
      window.PRELOADER_COMPLETE = true;
      window.PRELOADER_CALLBACKS.forEach((cb) => cb());
      window.PRELOADER_CALLBACKS = [];
    },
  });
});
