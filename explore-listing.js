//EXPLORE LISTING ANIMATION
gsap.registerPlugin(ScrollTrigger);
gsap.config({
  force3D: true,
});

document.addEventListener("DOMContentLoaded", () => {
  window.onPreloaderComplete(() => {
    const otherListings = document.querySelector(
      '[data-container="other-listings"]'
    );
    // pin section
    gsap.to(otherListings.querySelector(".anim-other-listing-container"), {
      scrollTrigger: {
        trigger: otherListings,
        start: "top top",
        end: () =>
          "+=" +
          (otherListings.offsetHeight * 2 +
            document.querySelector("footer").offsetHeight +
            window.innerHeight),
        pin: true,
        scrub: true,
        anticipatePin: 1,
        pinSpacing: true,
      },
      ease: "none",
    });

    //images reveal animation
    const cards = document.querySelectorAll(".anim-other-listing-gallery");
    const offsetZ = 4e3;
    gsap.set(cards, {
      opacity: 0,
    });

    function cardAnimation(index, i) {
      if (!cards[index]) return null;
      const e = i || {
        z: [-offsetZ, 0],
      };
      return gsap.to(cards[index], {
        keyframes: {
          opacity: [0, 0.8, 0.8, 0],
          ...e,
        },
        duration: 0.2,
      });
    }

    const cardGallery = gsap.timeline({
      defaults: {
        ease: "none",
      },
    });

    // Balanced card distribution across all quadrants
    cardGallery
      .add(
        cardAnimation(0, {
          z: [-offsetZ, 0],
          y: [0, "30rem"],
          x: [0, "10rem"],
        }),
        0
      )
      .add(
        cardAnimation(1, {
          z: [-offsetZ, 0],
        }),
        0.05
      )
      .add(
        cardAnimation(2, {
          z: [-offsetZ, 0],
        }),
        0.1
      )
      .add(
        cardAnimation(3, {
          z: [-offsetZ, 0],
          y: ["-5rem", "-50rem"],
        }),
        0.15
      )
      .add(
        cardAnimation(4, {
          z: [-offsetZ, 0],
        }),
        0.19
      )
      .add(
        cardAnimation(5, {
          z: [-offsetZ, 0],
        }),
        0.22
      )
      .add(
        cardAnimation(6, {
          z: [-offsetZ, 0],
          y: [0, "20rem"],
          x: [0, "-20rem"],
        }),
        0.25
      )
      .add(
        cardAnimation(7, {
          z: [-offsetZ, 0],
        }),
        0.3
      )
      .add(
        cardAnimation(8, {
          z: [-offsetZ, 0],
        }),
        0.34
      )
      .add(
        cardAnimation(9, {
          z: [-offsetZ, 0],
          x: [0, "30rem"],
          y: [0, "-20rem"],
        }),
        0.36
      );

    ScrollTrigger.create({
      trigger: otherListings.querySelector(".anim-other-listing-container"),
      start: "top 100%",
      end: () =>
        "+=" +
        (otherListings.offsetHeight * 4 +
          document.querySelector("footer").offsetHeight +
          window.innerHeight),
      scrub: true,
      animation: cardGallery,
    });

    // Subtle 3D BTN hover effect
    const btn = document.querySelector(
      '[data-element="explore-more-listings-btn"]'
    );

    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Convert to -1 to 1 range
      const xPos = (x / rect.width - 0.5) * 2;
      const yPos = (y / rect.height - 0.5) * 2;

      gsap.to(btn, {
        x: xPos * 8, // Much less movement
        y: yPos * 8,
        rotateX: -(yPos * 6), // Very gentle rotation
        rotateY: xPos * 6,
        scale: 1.01 + (Math.abs(xPos) + Math.abs(yPos)) * 0.01, // Barely noticeable scaling
        duration: 0.4, // Slower, more elegant
        ease: "power1.out",
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.8, // Even slower return
        ease: "power1.out", // Gentler easing
      });
    });
  });
});
