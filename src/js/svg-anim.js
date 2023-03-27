const svgAnim = {

    init () {
        function test() {
            Array.from(document.getElementsByClassName("cls-1")).forEach(pathElement => {
              pathElement.setAttribute('style', 'stroke-dasharray:'+pathElement.getTotalLength()+';stroke-dashoffset:'+pathElement.getTotalLength())
              console.log('first');
            }) 
          };
          
          function test2() {
            Array.from(document.getElementsByClassName("cls-1")).forEach(pathElement => {
              //pathElement.setAttribute('style', 'animation: dash 2s linear');
              pathElement.classList.add('test3');
              pathElement.setAttribute('style', 'stroke-dasharray:'+pathElement.getTotalLength()+';stroke-dashoffset:'+pathElement.getTotalLength())
          
            })
          }
          
          function test3() {
            Array.from(document.getElementsByClassName("cls-2")).forEach(pathElement => {
              //pathElement.setAttribute('style', 'animation: dash 2s linear');
              pathElement.classList.add('test3');
              pathElement.setAttribute('style', 'stroke-dasharray:'+pathElement.getTotalLength()+';stroke-dashoffset:'+pathElement.getTotalLength())
          
            })
          }
          
          function test4() {
            Array.from(document.getElementsByClassName("cls-3")).forEach(pathElement => {
              //pathElement.setAttribute('style', 'animation: dash 2s linear');
              pathElement.classList.add('test3');
              pathElement.setAttribute('style', 'stroke-dasharray:'+pathElement.getTotalLength()+';stroke-dashoffset:'+pathElement.getTotalLength())
          
            })
          }

          const body = document.querySelector("body");
          const mainContainer = body.querySelector(".main-container");
          const extraLongContainer = mainContainer.querySelector(".extra-long-container");
          const horizontalCoordinate = body.querySelector(".horizontal-coordinate");
          
          
          gsap.registerPlugin(ScrollTrigger);
          
          gsap.to(".icon-painting", {
            scrollTrigger: {
              trigger: '.icon-painting',
              start: "top center",
              end: "bottom  bottom",
              markers: {startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20},
              onEnter: test2,
            },
          
            //x: 400, 
            //rotation: 356, 
            duration: 4, 
            stagger: 0.2,
          })
          
          gsap.to(".icon-sculpture", {
            scrollTrigger: {
              trigger: '.icon-sculpture',
              start: "top top",

              end: "bottom bottom",
              markers: {startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20},
              onEnter: test3,
            },
          
            //x: 400, 
            //rotation: 356, 
            duration: 4, 
            stagger: 0.2,
          })
          
          gsap.to(".icon-photography", {
            scrollTrigger: {
              trigger: '.icon-photography',
              start: "top center",
              end: "bottom  bottom",
              markers: {startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20},
              onEnter: test4,
            },
          
            //x: 400, 
            //rotation: 356, 
            duration: 4, 
            stagger: 0.2,
          })
          
        
    }
}

export default svgAnim;