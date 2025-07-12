gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);
gsap.config({
  force3D: true,
});
CustomEase.create("menu-modal-open", "M0,0 C0.3,1.1 0.64,1 1,1 ");
CustomEase.create("menu-content", "M0,0 C0.84,0 0.16,1 1,1 ");
window.addEventListener("load", () => {
  const hamburgerBtn = document.querySelector("[data-element='menu-open']");
  const menu = document.querySelector("[data-container='menu-modal']");
  const overlay = document.querySelector("[data-element='menu-modal-overlay']");
  const menuOuter = document.querySelector("[data-element='menu-outer']");
  const menuInner = document.querySelector("[data-element='menu-inner']");
  const contents = document.querySelectorAll("[data-element='menu-content']");
  const menuPicture = document.querySelector("[data-element='menu-picture']");
  const whatsappModal = document.querySelector("[data-element='whatsapp-btn']");
  const hamburgerLines = gsap.utils.toArray(".hambuger_line");
  const links = menu
    .querySelector(".top_nav_heading_wrap")
    .querySelectorAll("a");
  let open = false;
  if (
    ![
      hamburgerBtn,
      menu,
      overlay,
      menuOuter,
      menuInner,
      menuPicture,
      ...contents,
    ].every((el) => !!el)
  )
    return;

  links.forEach((link) => {
    link.addEventListener("mouseover", () => {
      const src = link.getAttribute("data-menu-img");
      menuPicture.setAttribute("src", src);
    });
  });

  gsap.set([...contents], {
    opacity: 0,
    yPercent: 40,
  });

  gsap.set(menuOuter, {
    borderRadius: 0,
  });
  function openMenu() {
    const menuInnerWidth = menuInner.getBoundingClientRect().width;
    const menuInnerHeight = menuInner.getBoundingClientRect().height;
    const disableScroll = () => {
      //   document.body.style.overflow = "hidden";
      // document.body.style.height = "100vh";
      menu.style.pointerEvents = "auto";
      //   document.documentElement.style.overflow = "hidden";
      maisohHillsLenis.stop();
      open = true;
    };
    disableScroll();
    const tl = gsap.timeline({
      onComplete: () => {},
    });
    tl.addLabel("start", 0);
    tl.to(whatsappModal, { autoAlpha: 0 }, "start");
    tl.to(
      hamburgerLines,
      {
        y: (i) => (i ? "-0.2rem" : "0.4rem"),
        x: (i) => (i ? "-0.5rem" : "-0.5rem"),
        width: "1.2rem",
        rotate: (i) => (i ? "-45deg" : "45deg"),
        duration: 0.5,
      },
      "start"
    );
    tl.to(overlay, { opacity: 1, duration: 0.75 }, "start");
    tl.to(
      menuOuter,
      {
        width: menuInnerWidth,
        height: menuInnerHeight,
        borderRadius: "1rem",
        duration: 0.8,
        ease: "expo.inOut",
      },
      "start"
    );
    tl.to(
      [...contents],
      {
        stagger: 0.05,
        opacity: 1,
        yPercent: 0,
        ease: "menu-content",
      },
      "start+=0.3"
    );
  }

  function closeMenu() {
    const enableScroll = () => {
      //   document.body.style.overflow = "";
      //   document.documentElement.style.overflow = "";
      menu.style.pointerEvents = "none";
      open = false;
      if (
        !(
          typeof window.maisonHillsObserverEnabled !== "undefined" &&
          window.maisonHillsObserverEnabled
        )
      ) {
        maisohHillsLenis.start();
      }
    };
    const tl = gsap.timeline({
      onComplete: () => {
        enableScroll();
      },
    });
    tl.to(whatsappModal, { autoAlpha: 1 }, "start");
    tl.addLabel("start", 0);
    tl.to(
      hamburgerLines,
      {
        y: 0,
        x: 0,
        width: "2.5rem",
        rotate: 0,
        duration: 0.5,
      },
      "start"
    );
    tl.to(overlay, { opacity: 0, duration: 0.5 }, "start");
    tl.to(
      [...contents],
      {
        stagger: 0.01,
        opacity: 0,
        yPercent: 40,
        ease: "menu-content",
      },
      "start"
    ).to(
      menuOuter,
      {
        width: 0,
        height: 0,
        borderRadius: 0,
        duration: 0.7,
        ease: "expo.inOut",
      },
      "start+=0.1"
    );
  }

  hamburgerBtn.addEventListener("click", () => {
    if (!open) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  hamburgerBtn.addEventListener("mouseover", () => {
    if (!open) {
      gsap.to(hamburgerBtn.querySelector(".hambuger_line:first-child"), {
        x: 10,
        duration: 0.3,
        ease: "menu-modal-open",
      });
      gsap.to(hamburgerBtn.querySelector(".hambuger_line:last-child"), {
        x: -3,
        duration: 0.3,
        ease: "menu-modal-open",
      });
    }
  });
  hamburgerBtn.addEventListener("mouseleave", () => {
    if (!open) {
      gsap.to(hamburgerBtn.querySelector(".hambuger_line:first-child"), {
        x: 0,
        duration: 0.3,
        ease: "menu-modal-open",
      });
      gsap.to(hamburgerBtn.querySelector(".hambuger_line:last-child"), {
        x: 0,
        duration: 0.3,
        ease: "menu-modal-open",
      });
    }
  });
  overlay.addEventListener("click", closeMenu);
  //sound play
  // Attach playSound to element with id "play-sound"
  const playBtn = document.querySelector("[data-element='play-sound']");
  let isPlaying = false;
  const sound = new Howl({
    src: [
      "https://cdn.jsdelivr.net/gh/Kingscliq/webflow-sound-effects@master/mixkit-retro-game-notification-212.wav",
    ],
    loop: true,
    volume: 0.5,
  });

  const playSound = new Howl({
    src: [
      "https://cdn.jsdelivr.net/gh/Kingscliq/webflow-sound-effects@master/mixkit-movie-trailer-epic-impact-2908.wav",
    ],
    loop: true,
    volume: 0.5,
  });

  playSound.once("load", function () {
    if (playBtn) {
      playBtn.addEventListener("click", () => {
        if (isPlaying) {
          playSound.pause();
          playBtn.textContent = "SOUND OFF";
          isPlaying = false;
        } else {
          playSound.play();
          playBtn.textContent = "SOUND ON";
          isPlaying = true;
        }
      });
    }
  });
});
