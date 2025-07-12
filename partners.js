// Partners Section Animation
window.addEventListener("load", () => {
    const partnerPhrase = document.querySelector("[data-partners-ket-phrase]");
  
    if (partnerPhrase && !partnerPhrase?.querySelector(".word")) {
      new SplitType(partnerPhrase, { type: "words,chars" });
      const chars = partnerPhrase.querySelectorAll(".char");
      gsap.set(chars, { opacity: 0.2 });
    }
  
    window.onPreloaderComplete(() => {
      const partnersTl = gsap.timeline({
        scrollTrigger: {
          start: "top 90%",
          end: "center center",
          trigger: partnerPhrase,
          scrub: 0.2,
        },
      });
      partnersTl.to(partnerPhrase.querySelectorAll(".char"), {
        opacity: 1,
        stagger: 0.08,
      });
    });
  });
  