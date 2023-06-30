import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";

import GUI from 'lil-gui';

export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // this.gui = new GUI({container: document.querySelector(".hero-main")});
        // this.obj = {
        //     colorObj: {r: 0, g: 0, b: 0},
        //     intensity: 3,
        // };
        // this.setGUI();

        this.setSunLight();
    }   

    setGUI(){
        this.gui.addColor(this.obj, "colorObj").onChange(() => {
            this.sunLight.color.copy(this.obj.colorObj);
            this.ambientLight.color.copy(this.obj.colorObj);
            console.log(this.obj.colorObj);
        });
        this.gui.add(this.obj, "intensity", 0, 5,).onChange(() => {
            this.sunLight.intensity = this.obj.intensity;
            this.ambientLight.intensity = this.obj.intensity;
        });
    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        
        //// Shadow helper, shows the direction of the shadows
        // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(helper);
        
        this.sunLight.position.set(1.5, 10, 3);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#ffffff", 1)
        this.scene.add(this.ambientLight);
    }

    switchTheme(theme){
        console.log(theme);
        if(theme === "dark"){
            GSAP.to(this.sunLight.color, {
                b: 0.30196078431372547,
                g: 0.1607843137254902,
                r: 0.10196078431372549,
            });
            GSAP.to(this.ambientLight.color, {
                b: 0.30196078431372547,
                g: 0.1607843137254902,
                r: 0.10196078431372549,
            });
            GSAP.to(this.sunLight, {
                intensity: 1,
            })
        } else {
            GSAP.to(this.sunLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
        }
    }

    resize(){
    }

    update(){
    }
}