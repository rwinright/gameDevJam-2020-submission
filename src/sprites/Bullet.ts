export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: any, x: number, y: number, texture: any) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        scene.physics.add.existing(this);
        this.setGravity(0, -800);
    }

    update(keys: any) {
        if (this.body.blocked.left || this.body.blocked.right) {
            this.disableBody();
        }
        this.anims.play('bullet', true);
    }
}