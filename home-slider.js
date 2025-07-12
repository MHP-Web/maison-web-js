//HOME SLIDER
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  let allowScroll = true;
  let scrollTimeout = gsap
    .delayedCall(1.25, () => (allowScroll = true))
    .pause();
  let currentIndex = 0;
  let shouldPreventObserver = false; // Flag to prevent re-enabling observer
  let cursor = document.querySelector("[data-exclusive-collection-cursor]");
  let itemWrap = gsap.utils.toArray("[data-exclusive-collection-item-wrap]"),
    images = gsap.utils.toArray("[data-exclusive-collection-image]"),
    labels = gsap.utils.toArray("[data-exclusive-collection-label]"),
    numbers = gsap.utils.toArray("[data-exclusive-collection-number]"),
    outerWrappers = gsap.utils.toArray(
      "[data-exclusive-collection-item-wrap-outer]"
    ),
    innerWrappers = gsap.utils.toArray(
      "[data-exclusive-collection-item-wrap-inner]"
    );
  let thumbnailWrap = gsap.utils.toArray(
      "[data-little-exclusive-collection-item-wrap]"
    ),
    thumbnailImages = gsap.utils.toArray(
      "[data-little-exclusive-collection-image]"
    ),
    thumbnailOuterWrappers = gsap.utils.toArray(
      "[data-little-exclusive-collection-item-wrap-outer]"
    ),
    thumbnailInnerWrappers = gsap.utils.toArray(
      "[data-little-exclusive-collection-item-wrap-inner]"
    ),
    splitLabels = labels.map((label, index) => {
      const split = new SplitType(label, {
        type: "chars,words,lines",
      });
      const lines = label.querySelectorAll(".line");
      gsap.set(lines, { overflow: "hidden" });
      if (index > 0) {
        const chars = label.querySelectorAll(".char");
        gsap.set(chars, { autoAlpha: 0, yPercent: 150 });
      }
      return split;
    }),
    splitNumbers = numbers.map((number, index) => {
      const split = new SplitType(number, {
        type: "chars,words,lines",
      });
      const lines = number.querySelectorAll(".line");
      gsap.set(lines, { overflow: "hidden" });
      if (index > 0) {
        const chars = number.querySelectorAll(".char");
        gsap.set(chars, { autoAlpha: 0, yPercent: 150 });
      }
      return split;
    });

  // set z-index levels for the swipe panels
  const [firstSwipePanel, ...restSwipePanels] = itemWrap;
  const [firstThumbnailPanel, ...restThumbnailPanels] = thumbnailWrap;
  const [, ...restOuterWrappers] = outerWrappers;
  const [, ...restInnerWrappers] = innerWrappers;
  const [, ...restThumbnailOuterWrappers] = thumbnailOuterWrappers;
  const [, ...restThumbnailInnerWrappers] = thumbnailInnerWrappers;
  gsap.set(restSwipePanels, { zIndex: 0 });
  gsap.set(firstSwipePanel, { zIndex: 1 });
  gsap.set(restOuterWrappers, { xPercent: 100 });
  gsap.set(restInnerWrappers, { xPercent: -100 });
  gsap.set(restThumbnailPanels, { zIndex: 0 });
  gsap.set(firstThumbnailPanel, { zIndex: 1 });
  gsap.set(restThumbnailOuterWrappers, { xPercent: 100 });
  gsap.set(restThumbnailInnerWrappers, { xPercent: -100 });

  window.onPreloaderComplete(() => {
    // handle the panel swipe animations
    function gotoPanel(index, isScrollingDown) {
      // return to normal scroll if we're at the end or back up to the start
      if (
        (index === itemWrap.length && isScrollingDown) ||
        (index === -1 && !isScrollingDown)
      ) {
        allowScroll = true;
        shouldPreventObserver = true; // Set flag to prevent re-enabling
        intentObserver.disable(); // resume native scroll

        // Reset the flag after a short delay to allow normal re-entry
        gsap.delayedCall(0.5, () => {
          shouldPreventObserver = false;
        });
        return;
      }

      allowScroll = false;
      scrollTimeout.restart(true);
      let tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
      });
      let thumbnailTl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
      });

      if (isScrollingDown) {
        gsap.set(itemWrap[currentIndex], { zIndex: 0 });
        tl.to(images[currentIndex], { xPercent: -15 }).set(
          itemWrap[currentIndex],
          {
            autoAlpha: 0,
          }
        );
        gsap.set(itemWrap[index], { zIndex: 1, autoAlpha: 1 });
        tl.fromTo(
          [outerWrappers[index], innerWrappers[index]],
          {
            xPercent: (i) => (i ? -100 : 100),
          },
          {
            xPercent: 0,
          },
          0
        )
          .fromTo(images[index], { xPercent: 15 }, { xPercent: 0 }, 0)
          .fromTo(
            splitLabels[index].chars,
            {
              autoAlpha: 0,
              yPercent: 150,
            },
            {
              autoAlpha: 1,
              yPercent: 0,
              stagger: 0.02,
              ease: "power2",
            },
            0.8
          )
          .fromTo(
            splitNumbers[index].chars,
            {
              autoAlpha: 0,
              yPercent: 150,
            },
            {
              autoAlpha: 1,
              yPercent: 0,
              stagger: 0.02,
              ease: "power2",
            },
            0.1
          );

        gsap.set(thumbnailWrap[currentIndex], { zIndex: 0 });
        thumbnailTl
          .to(thumbnailImages[currentIndex], { xPercent: -15 })
          .set(thumbnailWrap[currentIndex], {
            autoAlpha: 0,
          });
        gsap.set(thumbnailWrap[index], { zIndex: 1, autoAlpha: 1 });
        thumbnailTl
          .fromTo(
            [thumbnailOuterWrappers[index], thumbnailInnerWrappers[index]],
            {
              xPercent: (i) => (i ? -100 : 100),
            },
            {
              xPercent: 0,
            },
            0
          )
          .fromTo(thumbnailImages[index], { xPercent: 15 }, { xPercent: 0 }, 0);
      }

      if (!isScrollingDown) {
        gsap.set(itemWrap[currentIndex], { zIndex: 0 });
        tl.to(images[currentIndex], { xPercent: 15 }).set(
          itemWrap[currentIndex],
          {
            autoAlpha: 0,
          }
        );
        gsap.set(itemWrap[index], { zIndex: 1, autoAlpha: 1 });
        tl.fromTo(
          [outerWrappers[index], innerWrappers[index]],
          {
            xPercent: (i) => (i ? 100 : -100),
          },
          {
            xPercent: 0,
          },
          0
        )
          .fromTo(images[index], { xPercent: -15 }, { xPercent: 0 }, 0)
          .fromTo(
            splitLabels[index].chars,
            {
              autoAlpha: 0,
              yPercent: -150,
            },
            {
              autoAlpha: 1,
              yPercent: 0,
              ease: "power2",
              stagger: 0.02,
            },
            0.1
          )
          .fromTo(
            splitNumbers[index].chars,
            {
              autoAlpha: 0,
              yPercent: -150,
            },
            {
              autoAlpha: 1,
              yPercent: 0,
              stagger: 0.02,
              ease: "power2",
            },
            0.8
          );

        gsap.set(thumbnailWrap[currentIndex], { zIndex: 0 });
        thumbnailTl
          .to(thumbnailImages[currentIndex], { xPercent: 15 })
          .set(thumbnailWrap[currentIndex], {
            autoAlpha: 0,
          });
        gsap.set(thumbnailWrap[index], { zIndex: 1, autoAlpha: 1 });
        thumbnailTl
          .fromTo(
            [thumbnailOuterWrappers[index], thumbnailInnerWrappers[index]],
            {
              xPercent: (i) => (i ? 100 : -100),
            },
            {
              xPercent: 0,
            },
            0
          )
          .fromTo(
            thumbnailImages[index],
            { xPercent: -15 },
            { xPercent: 0 },
            0
          );
      }

      currentIndex = index;
    }

    let pinnedScrollY = 0;
    // create an observer and disable it to start
    let intentObserver = ScrollTrigger.observe({
      type: "wheel,touch",
      onUp: () => allowScroll && gotoPanel(currentIndex - 1, false),
      onDown: () => allowScroll && gotoPanel(currentIndex + 1, true),
      onEnable(self) {
        allowScroll = true;
        let savedScroll = pinnedScrollY || self.scrollY();
        self._restoreScroll = () => self.scrollY(savedScroll);
        document.addEventListener("scroll", self._restoreScroll, {
          passive: false,
        });
        if (typeof maisohHillsLenis !== "undefined") {
          maisohHillsLenis.stop();
          window.maisonHillsObserverEnabled = true;
        }
      },
      onDisable: (self) => {
        document.removeEventListener("scroll", self._restoreScroll);
        if (typeof maisohHillsLenis !== "undefined") {
          maisohHillsLenis.start();
          window.maisonHillsObserverEnabled = false;
        }
      },
      preventDefault: true,
    });
    intentObserver.disable();

    // pin swipe section and initiate observer
    ScrollTrigger.create({
      trigger: '[data-container="exclusive-carousel"]',
      start: "top top",
      end: "+=0",
      onEnter: (self) => {
        if (intentObserver.isEnabled || shouldPreventObserver) {
          return;
        }
        pinnedScrollY = self.start;
        self.scroll(self.start + 1);
        intentObserver.enable();
      },
      onEnterBack: (self) => {
        if (intentObserver.isEnabled || shouldPreventObserver) {
          return;
        }
        pinnedScrollY = self.start;
        self.scroll(self.end - 1);
        intentObserver.enable();
      },
    });

    //Mouse move
    let exclusiveCarousel = document.querySelector(
      '[data-container="exclusive-carousel"]'
    );
    gsap.set(cursor, { opacity: 0 });
    window.addEventListener("mousemove", (e) => {
      const cursorRect = cursor.getBoundingClientRect();
      const cursorWidth = cursorRect.width || 200;
      const cursorHeight = cursorRect.height || 50;
      const xOffset = cursorWidth * 0.1;
      const yOffset = cursorHeight * 0.5;
      const cursorPosition = {
        left: Math.max(
          xOffset,
          Math.min(window.innerWidth - cursorWidth + xOffset, e.clientX)
        ),
        top: Math.max(
          yOffset,
          Math.min(window.innerHeight - cursorHeight + yOffset, e.clientY)
        ),
      };

      gsap.to(".cursor", {
        left: cursorPosition.left,
        top: cursorPosition.top,
        xPercent: -10,
        yPercent: -50,
        duration: 0.3,
        ease: "power3",
      });
    });
    if (exclusiveCarousel) {
      exclusiveCarousel.addEventListener("mousemove", () => {
        gsap.to(cursor, { opacity: 1 });
      });
      exclusiveCarousel.addEventListener("mouseleave", () => {
        gsap.to(cursor, { opacity: 0 });
      });
      exclusiveCarousel.addEventListener("click", () => {
        if (!(currentIndex < 0 && currentIndex > itemWrap.length - 1)) {
          const href = itemWrap
            ?.find((item, index) => index === currentIndex)
            ?.getAttribute("data-exclusive-collection-slug");
          if (!!href) {
            window.location.href = `/exclusives/${href}`;
          }
        }
      });
    }
  });
});
