

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const scrollingWrapper = document.querySelector('.scrolling-wrapper');

const scrollEnd = scrollingWrapper.scrollWidth;

console.log(scrollEnd);

let tl = gsap.timeline({paused: true});

tl.to(scrollingWrapper, { scrollTo: { x: "max" }, ease: 'linear' });

ScrollTrigger.create({
  trigger: scrollingWrapper,
  start: 'top top',
  end: () => `${scrollEnd}`,
  animation: tl,
  scrub: true,
  pin: true
});