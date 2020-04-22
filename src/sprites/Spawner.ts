import Walker from "./Walker";
import Enemy from "./Enemy";

export default class Spawner extends Phaser.Physics.Arcade.Sprite {
    spawnTimer: number = 0;
    spawnTimerMax: number = 100;
    public spawn: boolean = false;
    public EnemyGroup: any;
    constructor(scene: any, x: number, y: number, texture: any) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(2);
        //Just for debugging stuff
        this.setCollideWorldBounds(false);

        this.setVelocity(0, 0);
        this.EnemyGroup = this.scene.physics.add.group({
            key: "enemies",
            runChildUpdate: true
        });


    }
    create() {


    }
    update() {
        this.spawnTimer++;
        this.setMaxVelocity(0, 0);
        this.setVelocity(0, 0);
        if (this.spawnTimer > this.spawnTimerMax) {
            this.spawn = true;
            this.makeEnemy();
            this.spawnTimer = 0;
        }
    }

    makeEnemy() {
        if (this.spawn) {
            this.spawn = false;
            //let e = new Walker(this.scene, this.x, this.y, "player1");
            //let e = this.EnemyGroup.create(this.x, this.y, this.texture.key);
            let e = new Walker(this.scene, this.x, this.y, "player1");
            this.EnemyGroup.add(e);

        }
    }
}
