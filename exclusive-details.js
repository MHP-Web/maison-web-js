//EXCLUSIVE DETAILS PAGE ANIMATION
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(TextPlugin);
gsap.config({
  force3D: true,
});

document.addEventListener("DOMContentLoaded", function () {
  CustomEase.create("image-scale-down", "M0,0 C0.165,0.84 0.44,1 1,1 ");
  CustomEase.create("lerp", "M0,0 C0.1,0 0.9,1 1,1");
  CustomEase.create("reveal-content", "M0,0 C0.25,0.46 0.45,0.94 1,1 ");

  const propsDesciption = document.querySelector(".anim-props-description");
  const parallaxImgsUp = document.querySelectorAll(".anim-img-parallax-up");
  const parallaxImgsDown = document.querySelectorAll(".anim-img-parallax-down");
  const lineAnimWrapper = document.querySelectorAll(".anim-line-wrapper");
  const contentAnimsWrapper = document.querySelectorAll(
    ".anim-content-wrapper"
  );
  const exclusivecontentAnimsWrapper = document.querySelectorAll(
    ".anim-exclusive-section-content-wrapper"
  );

  function initializePropsDescriptionAnimation() {
    if (propsDesciption) {
      new SplitType(propsDesciption, { type: "words,chars" });
      const chars = propsDesciption.querySelectorAll(".char");
      gsap.set(chars, { opacity: 0.2 });
      const tl = gsap.timeline({
        scrollTrigger: {
          start: "top 90%",
          end: "center center",
          trigger: propsDesciption,
          scrub: 0.2,
        },
      });
      tl.to(propsDesciption.querySelectorAll(".char"), {
        opacity: 1,
        stagger: 0.08,
      });
    }
  }

  function initializeImageParallaxAnimation() {
    // const yPercentRandomVal = gsap.utils.random(-1 /00, 100);
    [...parallaxImgsUp, ...parallaxImgsDown].forEach((img) => {
      const container = img.parentElement;
      const containerOriginalHeight = container.offsetHeight;
      gsap
        .timeline()
        //   .addLabel("start", 0)
        .to(img, {
          y: -30,
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

  function initializeLineAnimation() {
    lineAnimWrapper.forEach((line) => {
      const lineAnim = line.querySelectorAll(".anim-line");
      const lineTextsAnim = line.querySelectorAll(".anim-line-text");
      gsap.set(lineAnim, {
        width: 0,
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: line,
          start: "top bottom",
          end: "bottom center",
          scrub: 0.2,
        },
      });
      tl.addLabel("start", 0);
      tl.to(lineAnim, {
        width: "100%",
        duration: 1.5,
      });
      tl.to(
        lineTextsAnim,
        {
          opacity: 1,
          stagger: 0.5,
        },
        "start"
      );
      lineTextsAnim.forEach((text) => {
        gsap.set(text, {
          opacity: 0,
        });
      });
    });
  }

  function initializeContentAnimation() {
    exclusivecontentAnimsWrapper.forEach((wrapper) => {
      const contentAnim = wrapper.querySelectorAll(
        ".anim-exclusive-section-content"
      );
      contentAnim.forEach((content) => {
        gsap.set(content, {
          opacity: 0,
          //   y: 60,
        });
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 80%",
          end: "bottom end",
        },
      });
      tl.addLabel("start", 0);
      tl.to(
        contentAnim,
        {
          opacity: 1,
          stagger: 0.1,
          //   y: 0,
          duration: 0.8,
          ease: "reveal-content",
        },
        "start"
      );
    });
    contentAnimsWrapper.forEach((wrapper) => {
      const contentAnim = wrapper.querySelectorAll(".anim-content");
      contentAnim.forEach((content) => {
        gsap.set(content, {
          opacity: 0,
          //   y: 60,
        });
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 60%",
          end: "bottom end",
        },
      });
      tl.addLabel("start", 0);
      tl.to(
        contentAnim,
        {
          opacity: 1,
          stagger: 0.2,
          //   y: 0,
          duration: 0.8,
          ease: "reveal-content",
        },
        "start"
      );
    });
  }

  function initializeFullImageSectionAnimation() {
    const sectionImgs = document.querySelectorAll(".anim-fullwidth-section");
    sectionImgs.forEach((sectionImg) => {
      const clipPathAnim = sectionImg.querySelector(
        ".anim-fullwidth-section-clip-path"
      );
      const scaleAnim = sectionImg.querySelector(
        ".anim-fullwidth-section-scale"
      );
      const parallaxAnim = sectionImg.querySelector(
        ".anim-fullwidth-section-parallax"
      );

      gsap.set(clipPathAnim, {
        clipPath: "inset(3rem round 1.6rem)",
      });
      gsap.set(scaleAnim, {
        scale: 1.5,
      });

      const revealTimeline = gsap.timeline();
      const parallaxTimeline = gsap.timeline();

      parallaxTimeline.fromTo(parallaxAnim, { y: 100 }, { y: -100 }, 0);

      revealTimeline.fromTo(
        clipPathAnim,
        {
          clipPath: "inset(3rem round 1rem)",
        },
        {
          clipPath: "inset(0rem round 0rem)",
        }
      );
      revealTimeline.fromTo(scaleAnim, { scale: 1.5 }, { scale: 1.2 }, 0);

      ScrollTrigger.create({
        trigger: sectionImg,
        scrub: true,
        animation: parallaxTimeline,
      });

      ScrollTrigger.create({
        trigger: sectionImg,
        start: "top bottom",
        end: "top 10%",
        scrub: true,
        animation: revealTimeline,
      });
    });
  }

  window.onPreloaderComplete(() => {
    initializePropsDescriptionAnimation();
    initializeImageParallaxAnimation();
    initializeLineAnimation();
    initializeContentAnimation();
    initializeFullImageSectionAnimation();
  });
});
