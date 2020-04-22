import Helpers from "../Helpers";
// import Enemy from "./Enemy";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  ammo: number = 0;
  alive: boolean = true;
  knockback: boolean = false;
  knockbackTimer: number = 0;
  public hp: number = 10;

  constructor(scene: any, x: number, y: number, texture: any) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.world.enable(this);
    //  Set some default physics properties
    this.setScale(2);

    //Just for debugging stuff
    this.setCollideWorldBounds(false);

    this.setVelocity(0, 0);

    this.ammo = 30;
  }
  private direction: number;
  private facingRight = false;
  public bulletGroup: any;
  private bulletTimer: number = 0;


  create() {
    //Bullet frames and stuff
    this.bulletGroup = this.scene.physics.add.group({ runChildUpdate: true });

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
				end: 5,
				frameRate: 15,
				repeat: 0
      },{
        frameName: "space-marine-shoot",
        frameNameOverride: "shoot",
				start: 0,
				end: 1,
				frameRate: 15,
				repeat: -1
      },{
        frameName: "bullet",
        frameNameOverride: "bullet",
				start: 0,
				end: 1,
				frameRate: 2,
				repeat: -1
      }
		];
    
    Helpers().generateAnimations(playerAnims, this.scene, this.texture.key);
  }
  flyBack() {
    this.hp--;

    if (!this.knockback) {
      this.setVelocity(this.facingRight ? 1 : -1 * 1000, 1000);
      //this.setVelocityY(-1000);
      this.hp--;
      this.knockback = true;
    }
  }
  
  update(keys: any) {
    this.bulletTimer++;
    if (this.hp <= 0) {
      this.alive = false;
      this.disableBody(true, true);
    }
    if (this.alive && !this.knockback) {
      //Auto-resize the character-box.
      this.body.height = this.frame.cutHeight * 2;
      this.body.width = this.frame.cutWidth * 2;
      this.body.setOffset(this.frame.centerX, this.frame.centerY);

      //movement/jumping
      this.direction = (keys.D.isDown - keys.A.isDown);

      this.flipX = !this.facingRight;

      this.setVelocityX(this.direction * 120);
      this.setMaxVelocity(120, 1000);

      //Play the animations for running/idling
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
      
      if (keys.E.isDown && this.bulletTimer > 5 && this.ammo > 0) {
        this.bulletTimer = 0;
        this.ammo--;
        let bullet = this.bulletGroup.create(this.x, this.y, this.texture.key).setScale(2);
        bullet.body.setVelocity(this.facingRight ? 500 : -500, 0);
        !this.facingRight ? bullet.flipX = true : null;
        bullet.body.setAllowGravity(false);
        bullet.anims.play('bullet');
        bullet.setOrigin(0.5, 0.5);
        bullet.setSize(8, 5);
      }

      //Climbing!!!!!
      //Limit this to certain rocky/viney surfaces. 
      //It can also be controlled by detecting the player's collision with the tilemap and setting something weird on the tiles in Tiled.
      if (this.direction && (this.body.blocked.left || this.body.blocked.right)) {
        this.setVelocityY(-150);
      }
    }
    else if (this.knockback) {
      this.knockbackTimer++;
      if (this.knockbackTimer > 10) {
        this.knockback = false;
        this.knockbackTimer = 0;
      }
    }
  }

}