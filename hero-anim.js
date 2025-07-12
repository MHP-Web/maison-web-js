// HERO ANIMATION
gsap.registerPlugin(ScrollTrigger);
gsap.config({
  force3D: true,
});
gsap.registerPlugin(CustomEase);

window.addEventListener("load", () => {
  const heroBg = document.querySelector(".anim-hero-bg");
  const heroTextSvg = document.querySelector(".anim-hero-svg");
  const heroTextPaths = heroTextSvg?.querySelectorAll("path");
  const heroText = document.querySelector(".anim-hero-text");
  const heroOverlay = document.querySelector(".anim-hero-overlay");
  const heroBgContainer = document.querySelector(".anim-hero-bg-container");

  gsap.set(heroBgContainer, { scale: 1.3 });
  gsap.set(heroOverlay, {
    opacity: 1,
    xPercent: 0,
  });
  gsap.set(heroTextPaths, {
    yPercent: 120,
  });
  gsap.set(heroBg, {
    scale: 1.3,
  });

  window.onPreloaderComplete(function () {
    const tl = gsap.timeline();
    tl.addLabel("start", 0);
    if (heroText) {
      new SplitType(heroText);
      const chars = heroText.querySelectorAll(".char");
      gsap.set(chars, {
        yPercent: 120,
      });
      chars.forEach((char, index) => {
        tl.to(
          char,
          {
            yPercent: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          `start+=${1 + index * 0.05}`
        );
      });
    }

    heroTextPaths?.forEach((path, index) => {
      tl.to(
        path,
        {
          yPercent: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        `start+=${1 + index * 0.05}`
      );
    });
    tl.to(
      heroOverlay,
      {
        xPercent: 100,
        duration: 1.5,
        ease: "expo.inOut",
      },
      "start"
    );
    tl.to(
      heroBg,
      {
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
      },
      "start"
    );
    if (heroBgContainer) {
      gsap.timeline().to(heroBgContainer, {
        y: -600,
        opacity: 0.5,
        startAt: {
          y: 0,
          opacity: 1,
        },
        // duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: heroBgContainer,
          start: "top top",
          end: "+=900vh",
          scrub: 0,
        },
      });
    }
  });
});
