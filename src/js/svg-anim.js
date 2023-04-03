const svgAnim = {

    init () {
        function test() {
            Array.from(document.getElementsByClassName("cls-1")).forEach(pathElement => {
              pathElement.setAttribute('style', 'stroke-dasharray:'+pathElement.getTotalLength()+';stroke-dashoffset:'+pathElement.getTotalLength())
              console.log('first');
            }) 
          };
          
          function svgPaintingAnim() {
            Array.from(document.getElementsByClassName("cls-1")).forEach(pathElement => {
              //pathElement.setAttribute('style', 'animation: dash 2s linear');
              pathElement.classList.add('svg-animation');
              pathElement.setAttribute('style', 'stroke-dasharray:'+pathElement.getTotalLength()+';stroke-dashoffset:'+pathElement.getTotalLength())
          
            })
          }
          
          function svgSculptureAnim() {
            Array.from(document.getElementsByClassName("cls-2")).forEach(pathElement => {
              //pathElement.setAttribute('style', 'animation: dash 2s linear');
              pathElement.classList.add('svg-animation');
              pathElement.setAttribute('style', 'stroke-dasharray:'+pathElement.getTotalLength()+';stroke-dashoffset:'+pathElement.getTotalLength())
          
            })
          }
          
          function svgPhotographAnim() {
            Array.from(document.getElementsByClassName("cls-3")).forEach(pathElement => {
              //pathElement.setAttribute('style', 'animation: dash 2s linear');
              pathElement.classList.add('svg-animation');
              pathElement.setAttribute('style', 'stroke-dasharray:'+pathElement.getTotalLength()+';stroke-dashoffset:'+pathElement.getTotalLength())
          
            })
          }

          gsap.registerPlugin(ScrollTrigger);
          
          gsap.to(".icon-painting", {
            scrollTrigger: {
              trigger: '.icon-painting',
              start: "top 90%",
              end: "bottom  bottom",
              //markers: {startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20},
              onEnter: svgPaintingAnim,
            },
            duration: 4, 
            stagger: 0.2,
          })
          
          gsap.to(".icon-sculpture", {
            scrollTrigger: {
              trigger: '.icon-sculpture',
              start: "top 90%",
              end: "bottom bottom",
              //markers: {startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20},
              onEnter: svgSculptureAnim,
            },
            duration: 4, 
            stagger: 0.2,
          })
          
          gsap.to(".icon-photography", {
            scrollTrigger: {
              trigger: '.icon-photography',
              start: "top 90%",
              end: "bottom  bottom",
              //markers: {startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20},
              onEnter: svgPhotographAnim,
            },
            duration: 4, 
            stagger: 0.2,
          })
          


        
    }
}

export default svgAnim;


