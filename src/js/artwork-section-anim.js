const artsectionAnim = {

    init () {

          gsap.registerPlugin(ScrollTrigger);
          var tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".orsay-painting--frame",
              start: "top 90%",
              //end: "+=400",
              scrub: false,
              //markers: true
            }
          });

          tl
          .from(".orsay-painting--frame", {
            opacity: 0,
            x: -500
          })
          .from(".artTitlePainting", {
            opacity: 0,
            x: 500
          })

      
          var tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: ".artTitlePainting",
              start: "top 90%",
              //end: "+=400",
              //scrub: true,
              markers: true
            }
          });
          
          tl2
          .from(".artTitlePainting", {
            opacity: 0,
            x: 500
          })
          .from('.stag', {
            duration: 0.8,
            ease: 'expo.out',
            opacity: 0,
            y: -10,
            stagger: 0.3
          })
    }
}

export default artsectionAnim;
