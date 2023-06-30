import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";


export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.sizes = this.experience.sizes;
        
        GSAP.registerPlugin(ScrollTrigger);

        this.experience.resources.on("ready", ()=>{
            this.room = this.experience.world.room.actualRoom;
            this.setScrollTrigger();
        })
    }

    setScrollTrigger(){
        this.timeline = new GSAP.timeline();
        this.timeline.to(this.room.position, {
            x: () => {
                return this.sizes.width * 0.0015;
            },
            // y: 0,
            // z: 0,
            scrollTrigger:{
                trigger: ".first-move",
                markers: false,
                start: "top top",
                end: "bottom bottom",
                scrub: .5,
                invalidateOnRefresh: true,
            },
        });
    }
    
    resize(){
    }

    update(){
    }
}