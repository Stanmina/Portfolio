import * as THREE from "three";
import Experience from "../Experience";

export default class Floor {
    constructor() {
        this.Experience = new Experience();
        this.scene = this.Experience.scene;

        this.setFloor();
    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0x555555,
            side: THREE.BackSide,
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.receiveShadow = true;
        this.plane.position.y = 2.2;
    }

    update(){

    }
}