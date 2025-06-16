import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

let headerAnimationTimeline = gsap.timeline();

document.fonts.ready.then(() => {
  let split = SplitText.create(".header__subtitle", {
    type: "lines",
    autoSplit: true,
    onSplit: (self) => {
      headerAnimationTimeline.to(".header__name__cover", {
        scaleY: 0,
        duration: 1,
        ease: "power4.out",
      });
      headerAnimationTimeline.from(
        ".header__title",
        { y: 48, autoAlpha: 0 },
        "-=0.5"
      );
      headerAnimationTimeline.from(self.lines, {
        y: 50,
        filter: "blur(4px)",
        autoAlpha: 0,
        ease: "power4.out",
        stagger: {
          amount: 0.25,
        },
        // onComplete: () => {
        //   split.revert();
        // },
      });
    },
  });
});
