//BOTTOM NAV ANIMATION
window.addEventListener("load", () => {
    const exclusiveBottomNav = document.querySelector(
      "[data-element='bottom-nav']"
    );
    const isFooter = !!document.querySelector('[data-container="footer"]');
    const isHero = !!document.querySelector("#page-hero");
  
    const viewportHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;
    const scrollY = window.scrollY;
    const startHide = 200; // Hide after 200px
    const showAgain = totalHeight - viewportHeight - (viewportHeight + 200);
    if ((isHero && scrollY < startHide) || (isFooter && scrollY >= showAgain)) {
      gsap.set(exclusiveBottomNav, {
        pointerEvents: "none",
        autoAlpha: 0,
        yPercent: 100,
      });
    }
  
    function showHideBottomNav() {
      window.addEventListener("scroll", function () {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight;
        const startHide = 200; // Hide after 200px
        const showAgain = totalHeight - viewportHeight - (viewportHeight + 200); // total - 200vh
  
        if (
          (isHero ? scrollY >= startHide : true) &&
          (isFooter ? scrollY < showAgain : true)
        ) {
          // Hide element (in the middle section)
          gsap.to(exclusiveBottomNav, {
            pointerEvents: "all",
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power3.out",
          });
        } else {
          // Show element (first 100vh or last 100vh)
          gsap.to(exclusiveBottomNav, {
            pointerEvents: "none",
            autoAlpha: 0,
            yPercent: 100,
            duration: 1,
            ease: "power3.out",
          });
        }
      });
    }
  
    window.onPreloaderComplete(() => {
      showHideBottomNav();
    });
  });
  