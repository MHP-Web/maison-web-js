//FOOTER ANIMATION
window.addEventListener("load", () => {
    gsap.registerPlugin(ScrollTrigger);
    const footerContainer = document.querySelector("[data-container='footer']");
    const maisonFooter = document.querySelector("#maison-footer");
    const maisonFooterPaths = maisonFooter.querySelectorAll("path");
  
    gsap.set(maisonFooterPaths, {
      y: 200,
      opacity: 0,
    });
  
    window.onPreloaderComplete(() => {
      const footerTl = gsap.timeline({
        scrollTrigger: {
          trigger: footerContainer,
          start: "top 26%",
          toggleActions: "play pause resume reset",
        },
      });
  
      footerTl.to(maisonFooterPaths, {
        y: 0,
        opacity: 1,
        stagger: 0.02,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  });
  