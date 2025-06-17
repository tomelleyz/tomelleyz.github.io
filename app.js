import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

let headerAnimationTimeline = gsap.timeline();

const projects = gsap.utils.toArray(".project__mask");

document.fonts.ready.then(() => {
  let headerSubtitleSplit = SplitText.create(".header__subtitle", {
    type: "lines",
    autoSplit: true,
    onSplit: (self) => {
      headerAnimationTimeline.to(".header__firstname__mask", {
        scaleX: 0,
        duration: 0.5,
        ease: "power4.out",
      });
      headerAnimationTimeline.to(
        ".header__lastname__mask",
        {
          scaleX: 0,
          duration: 0.5,
          ease: "power4.out",
        },
        "-=25%"
      );
      headerAnimationTimeline.from(
        ".header__title",
        { y: 48, autoAlpha: 0 },
        "-=25%"
      );
      headerAnimationTimeline.from(self.lines, {
        y: 50,
        filter: "blur(4px)",
        autoAlpha: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: {
          amount: 0.25,
        },
        onComplete: () => {
          headerSubtitleSplit.revert();
        },
      });
    },
  });

  let funSubtitleSplit = SplitText.create(".fun__subtitle", {
    type: "lines",
    autoSplit: true,
    onSplit: (self) => {
      gsap.from(self.lines, {
        y: 50,
        filter: "blur(4px)",
        autoAlpha: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: {
          amount: 0.25,
        },
        onComplete: () => {
          funSubtitleSplit.revert();
        },
        scrollTrigger: {
          trigger: ".fun__subtitle",
          start: "75% bottom",
        },
      });
    },
  });

  let footerTitleSplit = SplitText.create(".footer__title", {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    onSplit: (self) => {
      gsap.from(self.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.1,
        onComplete: () => {
          footerTitleSplit.revert();
        },
        scrollTrigger: {
          trigger: ".footer__title",
          start: "75% bottom",
        },
      });
    },
  });
});

projects.forEach((project) => {
  gsap.fromTo(
    project,
    {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: project,
        start: "center bottom",
        toggleActions: "play none none none",
      },
    }
  );
});

gsap.from(".skill", {
  y: 10,
  opacity: 0,
  duration: 1,
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".skill",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
});
