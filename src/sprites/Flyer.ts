import Walker from "./Walker";

export default class Flyer extends Walker {
    moveUp: boolean = true;
    facingUp: boolean = true;
    constructor(scene: any, x: number, y: number, texture: any) {
        super(scene, x, y, texture);
        this.maxFallSpeed = 0;
        this.maxWalktime = 1000;
    }

    update() {
        super.update();
        // if (this.body.blocked.up || this.body.blocked.down
        //     || this.body.blocked.left || this.body.blocked.right) {
        //     this.reverseDirection();
        // }
        if (this.moveUp) {
            this.moveVertical();
        }
        else {
            this.moveHorizontal();
        }
    }

    moveVertical() {
        if (this.walkTimer > this.maxWalktime) {
            this.reverseDirection();
            this.walkTimer = 0;
        }
        if (this.body.blocked.up) {
            this.walkTimer = 0;
            this.facingUp = false;
        }
        else if (this.body.blocked.down) {
            this.walkTimer = 0;
            this.facingUp = true;
        }
        if (this.facingUp) {
            this.setVelocityY(-this.speed);
            this.setMaxVelocity(this.maxFallSpeed, this.speed);
        }
        else {
            this.setVelocityY(this.speed);
            this.setMaxVelocity(this.maxFallSpeed, this.speed);
        }
    }

    reverseDirection() {
        //console.log(this.moveUp);

        if (this.moveUp) {
            this.facingUp != this.facingUp;
        }
        else {
            this.facingRight != this.facingRight;
        }
    }
}