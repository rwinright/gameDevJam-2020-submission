import { Scene, Cameras } from 'phaser';

// import levelTiles from "../assets/world/tiles/tiles.png";
// import levelBackground from "../../assets/world/tiles/level1/back-towers.png";

import levelJson from "../assets/tilemaps/large-test-level.json";
import { CST } from '../../CST';

//Import Player sprites
import Player from '../../sprites/Player';
import Enemy from '../../sprites/Enemy';
import Walker from '../../sprites/Walker';
import Flyer from '../../sprites/Flyer';
import Jumper from '../../sprites/Jumper';
import Spawner from '../../sprites/spawner';

export default class Level1 extends Scene {
  constructor() {
    super({ key: CST.SCENES.GAME.LEVEL1 })
  }
  private keys: any;
  public player1: Player;
  //will update to make this an array just want to get a single one working first
  public enemy1: Enemy;
  public Enemies: Enemy[] = [];
  public spawner: Spawner;
  private collisionLayers: any = [];

  init(data: any) {
    console.log(data.play);
  }

  public create() {
    //Probably going to extract all this to the "helper function"
    const map = this.make.tilemap({ key: 'level1Map' });
    // const bgTiles = map.addTilesetImage("cave background", 'caveBG');
    // const tiles = map.addTilesetImage("cave tileset", 'cave');
    console.log(map.heightInPixels)
    this.add.tileSprite(0, 0, map.heightInPixels, map.heightInPixels, 'back-towers')

    const tileList = [{
      tilesetName: "another-world-tileset",
      key: "another-world"
    }, {
      tilesetName: "sci-fi-environment-tileset",
      key: "sci-fi-environment"
    }]

    //
    let extractedTiles = tileList.map((tile: any) => {
      return map.addTilesetImage(tile.tilesetName, tile.key);
    });

    console.log(extractedTiles);
    //Set the names of the layers in the json file.
    const layerNames = ["Ground", "Base", "GroundDecoration", "Conduits"];

    //Since backgrounds are usually dynamic, this layer is created separately. 
    // map.createStaticLayer('Background', bgTiles, 0, 200);
    // this.add.image(0, 0, 'back-towers');

    //This needs some hardcore refactoring
    layerNames.forEach((layerName: string) => {
      if (layerName === "Ground") { //Layernames that need collisions
        //Temporary variable for the collision layer;
        let colLayer = map.createStaticLayer(layerName, extractedTiles[0], 0, 200).setCollisionByExclusion([-1]);
        //Put the layers requiring collision into the outer array so the player can access it.
        this.collisionLayers.push(colLayer);
      } else if (layerName === "Base" || layerName === "Conduits") {
        map.createStaticLayer(layerName, extractedTiles[1], 0, 200);
      } else {
        map.createStaticLayer(layerName, extractedTiles[0], 0, 200);
      }
    });
    this.spawner = new Spawner(this, 400, 500, 'player1');
    this.enemy1 = new Walker(this, 200, 300, 'player1');
    this.physics.add.collider(this.enemy1, this.collisionLayers);
    this.physics.add.collider(this.spawner, this.collisionLayers);
    //Add to Enemy Array 

    this.player1 = new Player(this, 400, 400, 'player1');

    this.keys = this.input.keyboard.addKeys("W, S, A, D, P, E, Q, SPACE");
    //Perhaps store all players in array and add colliders through iteration?
    this.player1.create();

    //Set player collision with platforms.
    this.physics.add.collider(this.player1, this.collisionLayers);

    //Set Collision with Enemies
    //this.physics.add.collider(this.player1, this.Enemies);
    this.physics.add.collider(
      this.player1,
      this.spawner.EnemyGroup,
      this.collideWEnemy);

    this.physics.add.collider(
      this.spawner.EnemyGroup,
      this.player1.bulletGroup,
      this.collideWBullet
    )
    //force camera bounds from the map width/height and follow the player
    this.cameras.main
      .startFollow(this.player1, false, 0.1, 0.5, 0, 0)
      .setBounds(0, 0, map.widthInPixels, map.heightInPixels); //Follow the player

  }
  public collideWBullet(e: Enemy, b: any) {
    b.disableBody(true, true);
    e.hp--;
  }

  public collideWEnemy(p: Player, e: Enemy) {
    p.knockback = true;
    p.flyBack();
    e.reverseDirection();
  }

  public update() {
    this.spawner.update();
    if (this.player1.alive) {
      this.player1.update(this.keys);
    }
    //this.enemy1.update();
    for (let i = 0; i < this.Enemies.length; i++) {
      let e = this.Enemies[i];
      e.update();
    }

  }
}
