import Bullet from "./Bullet";
import { GetRandom } from "../Helpers";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: any, x: number, y: number, texture: any) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(2);
        // this.setBounce(1, 1);

        //Just for debugging stuff
        this.setCollideWorldBounds(false);

        this.setVelocity(0, 0);
        this.enemyGroup = this.scene.physics.add.group({ runChildUpdate: true });


    }

    private enemyGroup: any;

}