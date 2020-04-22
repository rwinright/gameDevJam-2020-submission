export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    facingRight: boolean = true;

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
    public hp: number = 3;

    update() {
        if (this.hp <= 0) {
            this.disableBody(true, true);
        }
    }
    reverseDirection() {
        this.facingRight = !this.facingRight;
    }
    private enemyGroup: any;

}