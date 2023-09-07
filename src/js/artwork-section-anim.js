const artsectionAnim = {

    init () {

          gsap.registerPlugin(ScrollTrigger);

          /* PAINTING */

          var tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".orsay-painting--frame",
              start: "top 70%",
              //end: "+=400",
              scrub: false,
              //markers: true
            }
          });

          tl
          .from(".orsay-painting--frame", {
            opacity: 0,
            x: -500,
            duration: 2,
          })
          /* .from(".artTitlePainting", {
            opacity: 0,
            x: 500
          }) */

      
          var tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: ".artTitlePainting",
              start: "top 70%",
              end: "+=400",
              //scrub: true,
              //markers: true
            }
          });
          
          tl2
          .from(".artTitlePainting", {
            opacity: 0,
            x: 500, 
            duration: 1
          })
          .from('.stag', {
            duration: 0.8,
            ease: 'expo.out',
            opacity: 0,
            y: -10,
            stagger: 0.3
          })

          /* SCULPTURE */

          var tlsculpt = gsap.timeline({
            scrollTrigger: {
              trigger: ".orsay-sculpture",
              start: "top 90%",
              //end: "+=400",
              scrub: false,
              //markers: true
            }
          });

          tlsculpt
          .from(".orsay-sculpture--frame", {
            opacity: 0,
            y: -500,
            duration: 2,
          })

          var tlsculpt2 = gsap.timeline({
            scrollTrigger: {
              trigger: ".orsay-sculpture",
              start: "top 70%",
              end: "+=400",
              //scrub: true,
              markers: true
            }
          });
          
          tlsculpt2
          .from(".artTitleSculpture", {
            opacity: 0,
            y: 500, 
            duration: 1
          })
          .from('.stag2', {
            duration: 1,
            ease: 'expo.out',
            opacity: 0,
            y: 20,
            stagger: 0.4
          })


          /* PHOTOGRAPHY */

          var tlphoto = gsap.timeline({
            scrollTrigger: {
              trigger: ".orsay-photograph",
              start: "top 90%",
              //end: "+=400",
              scrub: false,
              //markers: true
            }
          });

          tlphoto
          .from(".orsay-photograph--frame", {
            opacity: 0,
            y: 500,
            duration: 2.5,
          })

          var tlphoto2 = gsap.timeline({
            scrollTrigger: {
              trigger: ".orsay-photograph",
              start: "top 70%",
              end: "+=400",
              //scrub: true,
              markers: true
            }
          });
          
          tlphoto2
          .from(".artTitlePhotograph", {
            opacity: 0,
            y: -500, 
            duration: 1
          })
          .from('.stag3', {
            duration: 1,
            ease: 'expo.out',
            opacity: 0,
            y: 20,
            stagger: 0.4
          })
    }
}


export default artsectionAnim;
