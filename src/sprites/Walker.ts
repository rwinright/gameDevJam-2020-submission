import Enemy from "./Enemy";

export default class Walker extends Enemy {
    walkTimer: number = 0;
    public maxWalktime: number = 300;
    facingRight: boolean = true;
    hp: number = 4;
    speed: number = 250;
    public maxFallSpeed: number = 1000;

    constructor(scene: any, x: number, y: number, texture: any, EnemyGroup: any) {
        super(scene, x, y, texture, EnemyGroup);
    }

    update() {
        super.update();
        this.walkTimer++;
        this.moveHorizontal();
    }

    moveHorizontal() {

        if (this.walkTimer > this.maxWalktime) {
            this.facingRight = !this.facingRight;
            this.walkTimer = 0;
        }
        if (this.body.blocked.right) {
            this.walkTimer = 0;
            this.facingRight = false;
        }
        else if (this.body.blocked.left) {
            this.walkTimer = 0;
            this.facingRight = true;
        }
        if (this.facingRight) {
            this.setVelocityX(this.speed);
            this.setMaxVelocity(this.speed, this.maxFallSpeed);
        }
        else {
            this.setVelocityX(-this.speed);
            this.setMaxVelocity(this.speed, this.maxFallSpeed);
        }
    }
}
