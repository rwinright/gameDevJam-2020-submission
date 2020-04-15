import Walker from "./Walker";

export default class Jumper extends Walker {
    jumperTimer: number = 0;
    jumpTrigger: number = 30;
    constructor(scene: any, x: number, y: number, texture: any) {
        super(scene, x, y, texture);
    }

    update() {
        super.update();
        this.moveHorizontal();
        this.jumperTimer++;
        if (this.jumpTrigger < this.jumperTimer && this.body.blocked.down) {
            this.setVelocityY(-500);
            this.jumperTimer = 0;
        }
    }
}