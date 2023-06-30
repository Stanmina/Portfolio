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
        
        GSAP.registerPlugin(ScrollTrigger);

        this.experience.resources.on("ready", ()=>{
            this.room = this.experience.world.room.actualRoom;
            this.setPath();
        })
    }

    setPath(){
        this.timeline = new GSAP.timeline();
        this.timeline.to(this.room.position, {
            x: 5,
            scrollTrigger:{
                trigger: ".first-move",
                markers: true,
                start: "top top",
                end: "bottom bottom",
                scrub: .5,
            },
        });
    }
    
    resize(){
    }

    update(){
    }
}