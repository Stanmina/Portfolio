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
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.x = 0;
        this.perspectiveCamera.position.y = 10;
        this.perspectiveCamera.position.z = 20;
    }

    createOrthographicCamera(){
        this.OrthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -10,
            100
        );  

        this.OrthographicCamera.position.y = 5;
        this.OrthographicCamera.position.z = 5;
        this.OrthographicCamera.rotation.x = -Math.PI / 10;

        this.scene.add(this.OrthographicCamera);

        // this.helper = new THREE.CameraHelper(this.OrthographicCamera);
        // this.scene.add(this.helper)


        const size = 20;
        const divisions = 20;

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
        // console.log(this.perspectiveCamera.position)
        this.controls.update();

        // this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update();
        
        // this.helper.position.copy(this.OrthographicCamera.position);
        // this.helper.rotation.copy(this.OrthographicCamera.rotation);
    }
}