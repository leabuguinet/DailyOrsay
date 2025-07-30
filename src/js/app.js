import artDisplay from "./art-display";
import svgAnim from "./svg-anim";
import artsectionAnim from "./artwork-section-anim";

artDisplay.init();
svgAnim.init();
artsectionAnim.init();

gsap.registerPlugin(SplitText);
gsap.config({ trialWarn: false });

ScrollSmoother.create({
  wrapper: "#smooth-container",
  content: "#smooth-content",
  smooth: 2,
  effects: true,
});

window.addEventListener("load", function () {
  const repeatCount = 3;
  const tl = gsap.timeline({ paused: true });
  const split = new SplitText("h1", { type: "chars" });

  split.chars.forEach((obj, i) => {
    let txt = obj.innerText;
    let clone = `<div class="cloneText"> ${txt} </div>`;
    let newHTML = `<div class="originalText"> ${txt} </div>${clone}`;
    obj.innerHTML = newHTML;
    gsap.set(obj.childNodes[1], {
      yPercent: i % 2 === 0 ? -100 : 100,
    });
    let tween = gsap.to(obj.childNodes, {
      repeat: repeatCount,
      ease: "none",
      yPercent: i % 2 === 0 ? "+=100" : "-=100",
    });
    tl.add(tween, 0);
  });
  gsap.to(tl, { progress: 1, duration: 4, ease: "power4.inOut" });

  gsap.from("h2", {
    y: 50,
    opacity: 0,
    delay: 3.5,
    duration: 1,
  });

  gsap.to(".sidebar", {
    scrollTrigger: {
      trigger: ".sidebar",
      start: "top top",
      endTrigger: ".banner",
      // end: "bottom bottom",
      // end: "+=100%",
      pin: true,
      pinSpacing: false,
      markers: false,
      invalidateOnRefresh: true,
    },
  });

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const dayContainer = document.querySelector(".current-date .day");
  dayContainer.innerHTML = currentDay;

 const options = { month: "long" };
  const monthContainer = document.querySelector(".current-date .month");
  monthContainer.innerHTML = new Intl.DateTimeFormat("en-UK", options).format(currentDate);

  
   
});
