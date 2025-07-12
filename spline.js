// WELCOME SECTION ANIMATION

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  //initial setup
  const textSequence = [
    {
      element: "[data-text='unique']",
      animConfig: {
        duration: 1,
        staggerTime: 0.2,
        ease: "power2.in",
        gap: 3,
      },
      startTime: 0,
    },
    {
      element: "[data-text='spaces']",
      animConfig: {
        duration: 1,
        staggerTime: 0.2,
        ease: "power2.in",
        gap: 3,
      },
      startTime: 0.5,
    },
    {
      element: "[data-text='unique-middle']",
      animConfig: {
        duration: 1,
        staggerTime: 0.2,
        ease: "power2.in",
        gap: 5,
      },
      startTime: 4.5,
    },
    {
      element: "[data-text='like-one']",
      animConfig: {
        duration: 1,
        staggerTime: 0.2,
        ease: "power2.in",
        gap: 3,
      },
      startTime: 13,
    },
    {
      element: "[data-text='you']",
      animConfig: {
        duration: 1,
        staggerTime: 0.2,
        ease: "power2.in",
        gap: 3,
      },
      startTime: 13.5,
    },
    {
      element: "[data-text='like-two']",
      animConfig: {
        duration: 1,
        staggerTime: 0.2,
        ease: "power2.in",
        gap: 3,
      },
      startTime: 20,
    },
    {
      element: "[data-text='us']",
      animConfig: {
        duration: 1,
        staggerTime: 0.2,
        ease: "power2.in",
        gap: 3,
      },
      startTime: 20.5,
    },
    {
      element: "[data-text='welcome']",
      animConfig: {
        duration: 1,
        staggerTime: 0.2,
        ease: "power2.in",
        gap: 10,
      },
      startTime: 29,
    },
  ];

  // Initialize text elements
  function setupTextElements() {
    textSequence.forEach(({ element }) => {
      const textEl = document.querySelector(element);
      if (!textEl) return;

      gsap.set(textEl, { autoAlpha: 0 });

      if (!textEl.querySelector(".char")) {
        new SplitType(textEl);
        const chars = textEl.querySelectorAll(".char");
        gsap.set(chars, {
          y: 40,
          opacity: 0,
        });
      }
    });
  }

  setupTextElements();

  window.onPreloaderComplete(() => {
    const scrollSection = document.querySelector(
      "[data-container='spline-scene']"
    );
    const splineSceneContent = document.querySelector(
      "[data-spline-scene-content]"
    );
    const splineTl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollSection,
        pin: true,
        scrub: 3,
        start: "top top",
        end: () => `+=${window.innerHeight * 10}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        pinSpacing: true,
      },
    });

    // Add starting label
    splineTl.addLabel("start", 0);

    // Main scene expansion animation
    splineTl.to(
      [splineSceneContent],
      {
        height: "100vh",
        width: "100vw",
        duration: 50,
      },
      "start+=0.2"
    );

    // Hide subscript text
    splineTl.to(
      "[data-subscript-text]",
      {
        opacity: 0,
        duration: 6,
      },
      "start+=0"
    );

    // Add text animations in sequence
    textSequence.forEach(({ element, startTime, animConfig }) => {
      const textEl = document.querySelector(element);
      if (!textEl) return;

      const endTime = startTime + animConfig.duration + animConfig.gap;

      // Set visibility
      splineTl.set(textEl, { autoAlpha: 1 }, "start+=0");

      // Animate in
      splineTl.to(
        textEl.querySelectorAll(".char"),
        {
          y: 0,
          opacity: 1,
          stagger: animConfig.staggerTime,
          duration: animConfig.duration,
          ease: animConfig.ease,
        },
        `start+=${startTime}`
      );

      // Animate out
      splineTl.to(
        textEl.querySelectorAll(".char"),
        {
          y: 40,
          opacity: 0,
          stagger: animConfig.staggerTime,
          duration: animConfig.duration,
          ease: animConfig.ease,
        },
        `start+=${endTime}`
      );
    });
  });
});
