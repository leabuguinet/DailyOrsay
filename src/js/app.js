
let paths = document.querySelectorAll('path');

//fillSvgPaths()

//document.addEventListener('scroll', fillSvgPaths)

function fillSvgPaths() {

    let scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
  console.log(scrollPercentage)
    
    for (var i = 0; i < paths.length; i++) {
        let path = paths[i];

        let pathLength = path.getTotalLength();

        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;

        let drawLength = pathLength * (scrollPercentage);

        path.style.strokeDashoffset = pathLength - drawLength;
    }
}


Array.from(document.getElementsByClassName("cls-1")).forEach(pathElement => {
  pathElement.setAttribute('style', 'stroke-dasharray:'+pathElement.getTotalLength()+';stroke-dashoffset:'+pathElement.getTotalLength())
  console.log('first')
})


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



/* gsap.to(".icon-painting", {
  scrollTrigger: ".transition-item", // start the animation when ".box" enters the viewport (once)
  x: 500,
  duration: 3,
}); */