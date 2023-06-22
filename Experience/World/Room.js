import * as THREE from "three";
import Experience from "../Experience";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.setModel()
    }

    setModel(){
        // console.log(this.room.scene)
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group){
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;

                    // NTS
                    // update names in blender
                    if(groupChild.name === "Cube019_1" || groupChild.name === "Cube021_1"){
                        groupChild.material = new THREE.MeshBasicMaterial({
                            map: this.resources.items.screen,
                        });
                    }
                })
            }


        });
        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(.75, .75, .75);
    }

    resize(){
    }

    update (){
    }
}