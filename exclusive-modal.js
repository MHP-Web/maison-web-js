//EXCLUSIVE MODAL ANIMATION
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);
gsap.config({
  force3D: true,
});
CustomEase.create("exclusive-modal-open", "M0,0 C0.22,0.61 0.36,1 1,1 ");
CustomEase.create("exclusive-modal-content", "M0,0 C0.84,0 0.16,1 1,1 ");
window.addEventListener("load", () => {
  const specsBtn = document.querySelector(
    "[data-element='exclusive-specs-modal-open']"
  );
  const closeBtn = document.querySelector(
    "[data-element='exclusive-specs-modal-close']"
  );
  const modalContainer = document.querySelector(
    "[data-container='exclusive-specs-modal']"
  );
  const modalOuter = document.querySelector(
    "[data-element='exclusive-specs-modal-outer']"
  );
  const modalInner = document.querySelector(
    "[data-element='exclusive-specs-modal-inner']"
  );
  const overlay = document.querySelector(
    "[data-element='exclusive-specs-modal-overlay']"
  );
  const contents = document.querySelectorAll(
    "[data-element='exclusive-specs-modal-content']"
  );
  let open = false;

  gsap.set([...contents], {
    opacity: 0,
    yPercent: 40,
  });
  gsap.set(closeBtn, {
    opacity: 0,
  });
  gsap.set(modalContainer, {
    pointerEvents: "none",
  });
  gsap.set(modalOuter, {
    borderRadius: 0,
  });

  function openModal() {
    const modalInnerWidth = modalInner.getBoundingClientRect().width;
    const modalInnerHeight = modalInner.getBoundingClientRect().height;
    const disableScroll = () => {
      //   document.body.style.overflow = "hidden";
      // document.body.style.height = "100vh";
      modalContainer.style.pointerEvents = "auto";
      //   document.documentElement.style.overflow = "hidden";
      maisohHillsLenis.stop();
      open = true;
    };
    disableScroll();
    const tl = gsap.timeline({
      onComplete: () => {},
    });
    tl.addLabel("start", 0);
    tl.to(overlay, { opacity: 1, duration: 0.75 }, "start");
    tl.to(
      modalOuter,
      {
        // width: modalInnerWidth,
        height: modalInnerHeight,
        borderRadius: "1rem",
        duration: 0.8,
        ease: "expo.inOut",
      },
      "start"
    );
    tl.to(closeBtn, {
      opacity: 1,
      duration: 0.7,
    });
    tl.to(
      [...contents],
      {
        stagger: 0.05,
        opacity: 1,
        yPercent: 0,
        ease: "exclusive-modal-content",
      },
      "start+=0.3"
    );
  }

  function closeModal() {
    const enableScroll = () => {
      //   document.body.style.overflow = "";
      //   document.documentElement.style.overflow = "";
      modalContainer.style.pointerEvents = "none";
      maisohHillsLenis.start();
      open = false;
    };
    const tl = gsap.timeline({
      onComplete: () => {
        enableScroll();
      },
    });
    tl.addLabel("start", 0);
    tl.to(overlay, { opacity: 0, duration: 0.5 }, "start");
    tl.to(closeBtn, {
      opacity: 0,
      duration: 0.7,
    });
    tl.to(
      [...contents],
      {
        stagger: 0.01,
        opacity: 0,
        yPercent: 40,
        ease: "exclusive-modal-content",
      },
      "start"
    ).to(
      modalOuter,
      {
        // width: 0,
        height: 0,
        borderRadius: 0,
        duration: 0.7,
        ease: "expo.inOut",
      },
      "start+=0.1"
    );
  }

  window.onPreloaderComplete(() => {
    specsBtn.addEventListener("click", () => {
      if (!open) {
        openModal();
      } else {
        closeModal();
      }
    });
    overlay.addEventListener("click", closeModal);
    closeBtn.addEventListener("click", closeModal);
  });
});
