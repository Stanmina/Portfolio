import * as THREE from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        
        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }   

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35, 
            this.sizes.aspect, 
            0.1, 
            1000);
        this.scene.add(this.perspectiveCamera)
        this.perspectiveCamera.position.z = 5;
    }

    createOrthographicCamera(){
        this.frustrum = 5;
        this.OrthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -100,
            100
        );
        this.scene.add(this.OrthographicCamera);

        const size = 10;
        const divisions = 10;

        const gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(10);
        this.scene.add(axesHelper);
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
    }

    resize(){
        // updating Perspective camera on risize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix()

        // updating OrthographicCamera camera on risize
        this.OrthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum)/2;
        this.OrthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum)/2;
        this.OrthographicCamera.top = this.sizes.frustrum/2;
        this.OrthographicCamera.bottom = -this.sizes.frustrum/2;
        this.OrthographicCamera.updateProjectionMatrix()
    }

    update (){
        this.controls.update();
    }
}