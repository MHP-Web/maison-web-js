//PRESS SECTION ANIMATION
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const pressTitle = document.querySelector("#press-heading");
  const pressTitlePaths = pressTitle.querySelectorAll("path");
  const mainContainer = document.querySelector("[data-press='main-container']");
  const pressContainer = document.querySelector("[data-press='container']");

  gsap.set(pressTitlePaths, {
    y: 200,
    opacity: 0,
  });

  window.onPreloaderComplete(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: pressContainer,
        start: "top 5%",
        endTrigger: mainContainer,
        end: "bottom 20%",
        scrub: 1,
        pin: true,
        pinSpacing: false,
      },
    });

    const pressTl = gsap.timeline({
      scrollTrigger: {
        trigger: pressTitle,
        start: "top 100%",
        end: "bottom top",
        scrub: 1,
      },
    });

    pressTl.to(pressTitlePaths, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 1,
      ease: "power2.inOut",
    });
  });
});
