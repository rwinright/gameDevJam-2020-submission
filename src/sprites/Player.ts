import Enemy from "./Enemy";

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
    // this.setBounce(1, 1);

    //Just for debugging stuff
    this.setCollideWorldBounds(false);

    this.setVelocity(0, 0);

    this.ammo = 10000;
  }
  private direction: number;
  private facingRight = false;
  private facingUp = false;
  public bulletGroup: any;
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

    //Generate character frames
    //TODO: Place into separate file for reuse?
    // This will all be different too.
    let idleFrames = this.scene.anims.generateFrameNames(this.texture.key, {
      start: 0, end: 5, zeroPad: 4, prefix: 'idle/', suffix: '.png'
    });
    let runFrames = this.scene.anims.generateFrameNames(this.texture.key, {
      start: 0, end: 7, zeroPad: 4, prefix: 'run/', suffix: '.png'
    });
    let kneelFrame = this.scene.anims.generateFrameNames(this.texture.key, {
      start: 0, end: 1, zeroPad: 4, prefix: 'kneel/', suffix: '.png'
    });
    let jumpFrames = this.scene.anims.generateFrameNames(this.texture.key, {
      start: 0, end: 1, zeroPad: 4, prefix: 'jump/', suffix: '.png'
    });
    let aimUpFrames = this.scene.anims.generateFrameNames(this.texture.key, {
      start: 0, end: 1, zeroPad: 4, prefix: 'idle_shoot_up/', suffix: '.png'
    });

    //Create player animations
    //TODO: Place into another file for reuse?
    //This will go to the helper function
    this.scene.anims.create({
      key: 'idle',
      frames: idleFrames,
      frameRate: 5,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'run',
      frames: runFrames,
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'jump',
      frames: jumpFrames,
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'aim-up-idle',
      frames: aimUpFrames,
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'kneel',
      frames: kneelFrame,
      frameRate: 1,
      repeat: -1
    });
  }
  flyBack() {
    console.log("hi");
    this.hp--;

    if (!this.knockback) {
      this.setVelocity(this.direction * 120, 1000);
      //this.setVelocityY(-1000);
      this.hp--;
      this.knockback = true;
    }
  }
  update(keys: any) {
    this.bulletTime++;
    if (this.hp <= 0) {
      this.alive = false;
      this.disableBody(true, true);
    }
    if (this.alive && !this.knockback) {
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
        // console.log(this.frame.height)
      }

      //Kneel
      //There's also an animation for kneel-shooting
      if (keys.S.isDown) {
        this.anims.play("kneel", true);
        if (this.body.blocked.down) {
          this.setVelocityX(0);
          this.body.height = this.frame.height * 2;
          this.y += 8;
        }
      }

      //Jump
      if (keys.SPACE.isDown && this.body.blocked.down) {
        this.setVelocityY(-350);
      }

      if (this.body.velocity.y < 0 && !this.body.blocked.down) {
        this.anims.play("jump", true);
      }
      if (keys.E.isDown && this.bulletTime > 30) {
        this.bulletTime = 0;
        let bullet = this.bulletGroup.create(this.x, this.y, this.texture.key).setScale(2);
        bullet.body.setVelocity(this.facingRight ? 500 : -500, 0);
        !this.facingRight ? bullet.flipX = true : null;
        bullet.body.setAllowGravity(false);
        bullet.anims.play('bullet');
        // bullet.setOrigin(0.5, 0.5);
        bullet.setSize(8, 5);
      }

      this.shootTimer++;
      if (keys.Q.isDown && this.shootTimer % 10 == 0) {
        let b = this.bulletGroup.create(this.x, this.y, this.texture.key).setScale(2);
        b.body.setAllowGravity(false);
        b.anims.play('bullet');
        b.setSize(8, 5);

        let speed = 1000;
        this.ammo--;

        //console.log(this.ammo);
        if (this.facingUp) {
          b.setVelocityY(-speed);
          b.setRotation(90);
        }
        else if (this.facingRight) {
          b.setVelocityX(speed);
          b.flipX = true;
          b.x += 20;
        }
        else {
          b.setVelocityX(-speed);
          b.x -= 20;
        }
      }

      //Aiming
      if (keys.W.isDown) {
        this.facingUp = true;
        this.anims.play("aim-up-idle", true);
      } else {
        this.facingUp = false;
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