export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    facingRight: boolean = true;
    public hp: number = 3;

    constructor(scene: any, x: number, y: number, texture: any) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        scene.physics.add.collider(this, scene.collisionLayers);
        this.setScale(2);

        //Just for debugging stuff
        this.setCollideWorldBounds(true);

        this.setVelocity(0, 0);
        this.enemyGroup = this.scene.physics.add.group({
            key: "enemies",
            runChildUpdate: true
        });
    }

    update() {
        if (this.hp <= 0) {
            this.disableBody(true, true);
        }
    }
    reverseDirection() {
        this.facingRight = !this.facingRight;
        console.log(this.facingRight);
    }
    private enemyGroup: any;

}