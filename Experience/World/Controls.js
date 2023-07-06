import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.sizes = this.experience.sizes;
    this.world = this.experience.world;

    GSAP.registerPlugin(ScrollTrigger);

    this.experience.resources.on("ready", () => {
      this.room = this.experience.world.room.actualRoom;
      this.setScrollTrigger();
    });
  }

  setupASScroll() {
    const asscroll = new ASScroll({
      ease: 0.1,
      disableRaf: true,
    });

    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start, .gsap-marker-end, [asscroll]"
        ),
      });
    });
    return asscroll;
  }

  setSmoothScroll() {
    this.asscroll = this.setupASScroll();
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      //Desktop
      "(min-width: 969px)": () => {
        // console.log("fired desktop");

        this.room.scale.set(0.3, 0.3, 0.3);
        this.camera.OrthographicCamera.position.set(0, 6.5, 10);
        this.room.position.set(0, 2.5, 0);
        // First section -----------------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            markers: false,
            invalidateOnRefresh: true,
          },
        });
        this.firstMoveTimeline.fromTo(
          this.room.position,
          { x: 0, y: 2.5, z: 0 },
          {
            x: () => {
              return this.sizes.width * 0.0014;
            },
          }
        );

        // Second section -----------------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.position,
            {
              x: () => {
                return -1;
              },
              z: () => {
                return this.sizes.height * 0.0032;
              },
            },
            "same"
          )
          .to(
            this.room.scale,
            {
              x: 0.75,
              y: 0.75,
              z: 0.75,
            },
            "same"
          )
          .to(
            this.world.Environment.sunLight.position,
            {
              x: -5,
              y: 15,
              z: 10,
            },
            "same"
          );

        // Third section -----------------------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.position,
            {
              x: () => {
                return this.sizes.width * 0.0014;
              },
              y: 2.5,
              z: 0,
            },
            "same"
          )
          .to(
            this.room.scale,
            {
              x: 0.3,
              y: 0.3,
              z: 0.3,
            },
            "same"
          );
      },

      // Mobile
      "(max-width: 968px)": () => {
        // console.log("fired mobile");

        // Resets
        this.room.scale.set(0.2, 0.2, 0.2);
        this.room.position.set(0, 2.5, 0);
        // this.rectLight.width = 0.3;
        // this.rectLight.height = 0.4;
        this.camera.OrthographicCamera.position.set(0, 6.5, 10);

        // First section -----------------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            // invalidateOnRefresh: true,
          },
        }).to(this.room.scale, {
          x: 0.1,
          y: 0.1,
          z: 0.1,
        });

        // Second section -----------------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.scale,
            {
              x: 0.25,
              y: 0.25,
              z: 0.25,
            },
            "same"
          )
          .to(
            this.room.position,
            {
              x: 1.5,
            },
            "same"
          );

        // Third section -----------------------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(this.room.position, {
          z: -4.5,
        });
      },

      // all
      all: () => {
        this.sections = document.querySelectorAll(".section");
        this.sections.forEach((section) => {
          this.progressWrapper = section.querySelector(".progress-wrapper");
          this.progressBar = section.querySelector(".progress-bar");

          if (section.classList.contains("right")) {
            GSAP.to(section, {
              borderTopLeftRadius: 300,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 0.6,
              },
            });
            GSAP.to(section, {
              borderBottomLeftRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          } else {
            GSAP.to(section, {
              borderTopRightRadius: 300,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 0.6,
              },
            });
            GSAP.to(section, {
              borderBottomRightRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          }
          GSAP.from(this.progressBar, {
            scaleY: 0,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
              pin: this.progressWrapper,
              pinSpacing: false,
            },
          });
        });

        // // All animations
        // // First section -----------------------------------------
        // this.firstCircle = new GSAP.timeline({
        //   scrollTrigger: {
        //     trigger: ".first-move",
        //     start: "top top",
        //     end: "bottom bottom",
        //     scrub: 0.6,
        //   },
        // }).to(this.circleFirst.scale, {
        //   x: 3,
        //   y: 3,
        //   z: 3,
        // });

        // // Second section -----------------------------------------
        // this.secondCircle = new GSAP.timeline({
        //   scrollTrigger: {
        //     trigger: ".second-move",
        //     start: "top top",
        //     end: "bottom bottom",
        //     scrub: 0.6,
        //   },
        // })
        //   .to(
        //     this.circleSecond.scale,
        //     {
        //       x: 3,
        //       y: 3,
        //       z: 3,
        //     },
        //     "same"
        //   )
        //   .to(
        //     this.room.position,
        //     {
        //       y: 0.7,
        //     },
        //     "same"
        //   );

        // // Third section -----------------------------------------
        // this.thirdCircle = new GSAP.timeline({
        //   scrollTrigger: {
        //     trigger: ".third-move",
        //     start: "top top",
        //     end: "bottom bottom",
        //     scrub: 0.6,
        //   },
        // }).to(this.circleThird.scale, {
        //   x: 3,
        //   y: 3,
        //   z: 3,
        // });
      },
    });
  }

  //   setScrollTrigger() {
  //     ScrollTrigger.matchMedia({
  //       //Desktop
  //       "(min-width: 969px)": () => {
  //         // console.log("fired desktop");
  //         console.log(this.room);

  //         // First section -----------------------------------------
  //         this.firstMoveTimeline = new GSAP.timeline({
  //           scrollTrigger: {
  //             trigger: ".first-move",
  //             start: "top top",
  //             end: "bottom bottom",
  //             scrub: 0.6,
  //             // markers: true,
  //             invalidateOnRefresh: true,
  //           },
  //         });
  //         this.firstMoveTimeline.fromTo(
  //           this.room.position,
  //           { x: 0, y: 2.5, z: 0 },
  //           {
  //             x: () => {
  //               return this.sizes.width * 0.0014;
  //             },
  //           }
  //         );

  //         // Second section -----------------------------------------
  //         this.secondMoveTimeline = new GSAP.timeline({
  //           scrollTrigger: {
  //             trigger: ".second-move",
  //             start: "top top",
  //             end: "bottom bottom",
  //             scrub: 0.6,
  //             invalidateOnRefresh: true,
  //           },
  //         })
  //           .to(
  //             this.room.position,
  //             {
  //               x: () => {
  //                 return -1;
  //               },
  //               z: () => {
  //                 return this.sizes.height * 0.0032;
  //               },
  //             },
  //             "same"
  //           )
  //           .to(
  //             this.room.scale,
  //             {
  //               x: 0.6,
  //               y: 0.6,
  //               z: 0.6,
  //             },
  //             "same"
  //           );
  //         // Third section -----------------------------------------
  //         this.thirdMoveTimeline = new GSAP.timeline({
  //           scrollTrigger: {
  //             trigger: ".third-move",
  //             start: "top top",
  //             end: "bottom bottom",
  //             scrub: 0.6,
  //             invalidateOnRefresh: true,
  //           },
  //         }).to(this.camera.OrthographicCamera.position, {
  //           y: 1.5,
  //           x: -4.1,
  //         });
  //       },
  //     });
  //   }

  resize() {}

  update() {}
}
