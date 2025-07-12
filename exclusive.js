//HORIZONTAL SCROLLING IN EXCLUSIVE PAGE
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
gsap.config({
  force3D: true,
});

document.addEventListener("DOMContentLoaded", () => {
  function initialiseGSAPScrollTriggerPinningHorizontal() {
    const exclusiveContainer = document.querySelector(
      '[data-container="exclusive-hero"]'
    );
    const exclusiveList = document.querySelector(
      '[data-container="exclusive-list"]'
    );
    const exclusiveListItemContainer = document.querySelectorAll(
      '[data-container="exclusive-list-item"]'
    );
    const exclusiveListPicLg = document.querySelectorAll(
      '[data-element="exclusive-list-pic-lg"]'
    );
    const exclusiveListPicSm = document.querySelectorAll(
      '[data-element="exclusive-list-pic-sm"]'
    );
    const exclusiveListHeading = document.querySelectorAll(
      '[data-element="exclusive-list-heading"]'
    );
    const exclusiveListParagraph = document.querySelectorAll(
      '[data-element="exclusive-list-paagraph"]'
    );
    const exclusiveListBtn = document.querySelectorAll(
      '[data-element="exclusive-list-button"]'
    );
    const exclusiveTextureImage = document.querySelector(
      '[data-element="exclusive-texture-image"]'
    );
    const exclusiveHorizontalScroll = document.querySelector(
      '[data-section="exclusive-horizontal-scroll"]'
    );

    let containerAnimation = gsap.to(exclusiveList, {
      scrollTrigger: {
        trigger: exclusiveList,
        start: "top top",
        end: () => "+=" + exclusiveList.offsetWidth,
        pin: true,
        scrub: true,
        anticipatePin: 1,
      },
      x: () =>
        -(exclusiveList.scrollWidth - document.documentElement.clientWidth) +
        "px",
      ease: "none",
    });

    exclusiveListPicSm.forEach((picSm, index) => {
      const listItem = exclusiveListItemContainer[index];
      const picSmContainer = picSm.parentElement;
      const tl = gsap.timeline();
      tl.addLabel("start", 0);
      if (index === 0) {
        tl.to(
          picSm,
          {
            scrollTrigger: {
              trigger: listItem,
              start: `top 20%`,
              end: `top 0%`,
              // containerAnimation: containerAnimation,
              onEnter: () => {
                picSm.classList.add("img-scale-up-active");
              },
              onLeave: () => {
                picSm.classList.add("img-scale-up-active");
              },
              onEnterBack: () => {
                picSm.classList.add("img-scale-up-active");
              },
              onLeaveBack: () => {
                picSm.classList.add("img-scale-up-active");
              },
            },
          },
          "start"
        );
      } else {
        tl.to(
          picSm,
          {
            scrollTrigger: {
              trigger: picSm,
              start: "left 80%",
              end: `right right`,
              containerAnimation: containerAnimation,
              onEnter: () => {
                picSm.classList.add("img-scale-up-active");
              },
              onLeave: () => {
                picSm.classList.add("img-scale-up-active");
              },
              onEnterBack: () => {
                picSm.classList.add("img-scale-up-active");
              },
              onLeaveBack: () => {
                picSm.classList.add("img-scale-up-active");
              },
            },
          },
          "start"
        );
      }
      if (index === 0) {
        tl.to(
          picSmContainer,
          {
            ease: "none",
            scrollTrigger: {
              ease: "none",
              trigger: listItem,
              start: `top 0%`,
              end: `+=${listItem.scrollWidth * 1.3}`,
              scrub: true,
            },
            xPercent: -100,
            startAt: { xPercent: 0 },
          },
          "start"
        );
      } else if (index === exclusiveListPicSm.length - 1) {
        tl.to(
          picSmContainer,
          {
            ease: "none",
            scrollTrigger: {
              ease: "none",
              // trigger: picSmContainer,
              // start: "left right",
              // end: `+=${listItem.scrollWidth + picSmContainer.scrollWidth * 2}`,
              start: `+=${
                listItem.scrollWidth * (exclusiveListPicSm.length - 1)
              }`,
              end: `+=${
                listItem.scrollWidth * (exclusiveListPicSm.length - 1)
              }`,
              scrub: true,
            },
            xPercent: -50,
            startAt: { xPercent: 0 },
          },
          "start"
        );
      } else {
        tl.to(
          picSmContainer,
          {
            ease: "none",
            scrollTrigger: {
              ease: "none",
              trigger: picSmContainer,
              start: "left right",
              end: `+=${listItem.scrollWidth + picSmContainer.scrollWidth * 2}`,
              scrub: true,
              containerAnimation: containerAnimation,
            },
            xPercent: -70,
            startAt: { xPercent: 0 },
          },
          "start"
        );
      }
    });

    exclusiveListPicLg.forEach((picLg, index) => {
      const listItem = exclusiveListItemContainer[index];
      const picLgContainer = picLg.parentElement;
      const tl = gsap.timeline();
      tl.addLabel("start", 0);
      if (index === 0) {
        tl.to(
          picLg,
          {
            scrollTrigger: {
              trigger: listItem,
              start: `top 70%`,
              end: `top 0%`,
              // containerAnimation: containerAnimation,
              onEnter: () => {
                picLg.classList.add("img-scale-up-active");
              },
              onLeave: () => {
                picLg.classList.add("img-scale-up-active");
              },
              onEnterBack: () => {
                picLg.classList.add("img-scale-up-active");
              },
              onLeaveBack: () => {
                picLg.classList.add("img-scale-up-active");
              },
            },
            delay: 0.1,
          },
          "start"
        );
      } else {
        tl.to(
          picLg,
          {
            scrollTrigger: {
              trigger: picLg,
              start: "left 80%",
              end: `right right`,
              containerAnimation: containerAnimation,
              onEnter: () => {
                picLg.classList.add("img-scale-up-active");
              },
              onLeave: () => {
                picLg.classList.add("img-scale-up-active");
              },
              onEnterBack: () => {
                picLg.classList.add("img-scale-up-active");
              },
              onLeaveBack: () => {
                picLg.classList.add("img-scale-up-active");
              },
            },
            delay: 0.1,
          },
          "start"
        );
      }

      if (index === 0) {
        tl.to(
          picLgContainer,
          {
            ease: "none",
            scrollTrigger: {
              ease: "none",
              trigger: listItem,
              start: `top 0%`,
              end: `+=${listItem.scrollWidth + picLgContainer.scrollWidth}`,
              // trigger: picLgContainer,
              // end: `+=${listItem.scrollWidth + picLgContainer.scrollWidth}`,
              // start: "left right",
              scrub: true,
              // containerAnimation: containerAnimation,
            },
            x: 30,
            startAt: { x: 0 },
          },
          "start"
        );
      } else if (index === exclusiveListPicLg.length - 1) {
        tl.to(
          picLgContainer,
          {
            ease: "none",
            scrollTrigger: {
              ease: "none",
              // trigger: picLgContainer,
              end: `+=${listItem.scrollWidth + picLgContainer.scrollWidth}`,
              start: "left right",
              trigger: picLgContainer,
              // end: `+=${listItem.scrollWidth + picLgContainer.scrollWidth * 2}`,
              // start: "left right",
              scrub: true,
              containerAnimation: containerAnimation,
            },
            x: 0,
            startAt: { x: 10 },
          },
          "start"
        );
      } else {
        tl.to(
          picLgContainer,
          {
            ease: "none",
            scrollTrigger: {
              ease: "none",
              trigger: picLgContainer,
              end: `+=${listItem.scrollWidth + picLgContainer.scrollWidth * 2}`,
              start: "left right",
              scrub: true,
              containerAnimation: containerAnimation,
            },
            x: 30,
            startAt: { x: 0 },
          },
          "start"
        );
      }
    });

    exclusiveListHeading.forEach((heading, index) => {
      const headingItem = heading;
      const paagraphItem = exclusiveListParagraph[index];
      const btnItem = exclusiveListBtn[index];
      if (index === 0) {
        headingItem.classList.add("reveal-item-active");
        paagraphItem.classList.add("reveal-item-active");
        btnItem.classList.add("reveal-item-active");
        return;
      }
      const tl = gsap.timeline();
      gsap.set(heading, {
        transitionDelay: 0.3,
      });
      gsap.set(paagraphItem, {
        transitionDelay: 0.4,
      });
      gsap.set(btnItem, {
        transitionDelay: 0.6,
      });
      tl.addLabel("start", 0);
      tl.to(
        [headingItem, paagraphItem, btnItem],
        {
          scrollTrigger: {
            trigger: paagraphItem,
            start: "left+=20 right",
            end: "right-=20 left",
            containerAnimation: containerAnimation,
            onEnter: () => {
              headingItem.classList.add("reveal-item-active");
              paagraphItem.classList.add("reveal-item-active");
              btnItem.classList.add("reveal-item-active");
            },
            onLeave: () => {
              headingItem.classList.add("reveal-item-active");
              paagraphItem.classList.add("reveal-item-active");
              btnItem.classList.add("reveal-item-active");
            },
            onEnterBack: () => {
              headingItem.classList.add("reveal-item-active");
              paagraphItem.classList.add("reveal-item-active");
              btnItem.classList.add("reveal-item-active");
            },
            onLeaveBack: () => {
              headingItem.classList.add("reveal-item-active");
              paagraphItem.classList.add("reveal-item-active");
              btnItem.classList.add("reveal-item-active");
            },
          },
          stagger: 0.8,
        },
        "start"
      );
    });
  }

  window.onPreloaderComplete(() => {
    initialiseGSAPScrollTriggerPinningHorizontal();
  });
});
