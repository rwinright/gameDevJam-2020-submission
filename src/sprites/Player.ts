import Helpers from "../Helpers";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  ammo: number
  
  constructor(scene: any, x: number, y: number, texture: any) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.world.enable(this);
    //  Set some default physics properties
    this.setScale(2);
    // this.setBounce(1, 1);

    //Just for debugging stuff
    this.setCollideWorldBounds(false);

    this.setVelocity(0, 0);

    this.ammo = 10000;
  }
  private direction: number;
  private facingRight = false;
  private facingUp = false;
  private bulletGroup: any;
  private bulletTime: number = 0;

  private shootTimer = 0;


  create() {
    //Bullet frames and stuff
    this.bulletGroup = this.scene.physics.add.group({ runChildUpdate: true });

    let bulletFrames = this.scene.anims.generateFrameNames(this.texture.key, {
      start: 0, end: 1, zeroPad: 4, prefix: 'bullet/', suffix: '.png'
    });

    this.scene.anims.create({
      key: 'bullet',
      frames: bulletFrames,
      frameRate: 5,
      repeat: 0
    });

    //Create player animations
    //TODO: Place into another file for reuse?
    //This will go to the helper function
    let playerAnims = [
			{
        frameName: "space-marine-idle", //Name of the frame within the atlas file
        frameNameOverride: "idle", //What you would like to name the frame to be used in anims.play();
				start: 0, //Starting frame
				end: 3, //Ending frame
				frameRate: 15, //How fast the animation runs
				repeat: -1 //Whether or not it repeats. (-1 means "infinitely")
			},{
        frameName: "space-marine-run",
        frameNameOverride: "run",
				start: 0,
				end: 3,
				frameRate: 15,
				repeat: -1
      },{
        frameName: "space-marine-jump",
        frameNameOverride: "jump",
				start: 0,
				end: 3,
				frameRate: 15,
				repeat: 1
      },{
        frameName: "space-marine-shoot",
        frameNameOverride: "shoot",
				start: 0,
				end: 1,
				frameRate: 15,
				repeat: -1
      }

		];

    Helpers().generateAnimations(playerAnims, this.scene, this.texture.key);
  }

  update(keys: any) {
    this.bulletTime++;
    //Auto-resize the character-box.
    this.body.height = this.frame.cutHeight * 2;
    this.body.width = this.frame.cutWidth * 2;

    //movement/jumping
    this.direction = (keys.D.isDown - keys.A.isDown);

    this.flipX = !this.facingRight;

    this.setVelocityX(this.direction * 120);
    this.setMaxVelocity(120, 1000);

    //Play the animations for running/idling
    // (this.direction === 0 && !this.body.velocity.y) ? this.anims.play("idle", true) : this.anims.play("run", true);
    if (keys.A.isDown) this.facingRight = false;
    if (keys.D.isDown) this.facingRight = true;

    //
    if ((keys.A.isDown || keys.D.isDown) && this.body.blocked.down && this.body.velocity.x) {
      this.anims.play("run", true);
    } else if (this.body.blocked.down && !this.direction && !this.body.velocity.x) {
      this.anims.play("idle", true);
      this.body.height = this.frame.height * 2;
    }

    //Jump
    if (keys.SPACE.isDown && this.body.blocked.down) {
      this.setVelocityY(-350);
    }

    if (this.body.velocity.y < 0 && !this.body.blocked.down) {
      this.anims.play("jump", true);
    }

    this.shootTimer++;

    //Climbing!!!!!
    //Limit this to certain rocky/viney surfaces. 
    //It can also be controlled by detecting the player's collision with the tilemap and setting something weird on the tiles in Tiled.
    if (this.direction && (this.body.blocked.left || this.body.blocked.right)) {
      this.setVelocityY(-150);
    }
  }

}