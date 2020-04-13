import { Scene, Cameras } from 'phaser';

import levelTiles from "../assets/world/tiles/tiles.png";
import levelBackground from "../assets/world/tiles/background.png";
// import player1Sprites from '../assets/player/SpriteSheet_player.png';

import Player_1_Sprite_Sheet_Atlas from '../assets/player/Player_1_Sprite_Sheet.json';

import levelJson from "../assets/tilemaps/large-test-level.json";
import { CST } from '../CST';

//Import Player sprites
import Player from '../sprites/Player';
import Enemy from '../sprites/Enemy';

export default class PlayScene extends Scene {
  constructor() {
    super({ key: CST.SCENES.UI.PLAY })
  }
  private cursor: any;
  private paused: boolean = false;
  public player1: any;
  public enemy1: any;
  private camera: any;

  init(data: any) {
    console.log(data.play);
  }

  public preload() {
    //Import level tiles
    this.load.image('tiles', levelTiles);
    this.load.image('bgTiles', levelBackground);
    this.load.tilemapTiledJSON('map', levelJson);
    this.load.multiatlas('player1', Player_1_Sprite_Sheet_Atlas, 'src/assets/player/');
    this.cursor = this.input.keyboard.addKeys("W, S, A, D, P, E, Q, SPACE");
  }

  public create() {
    const map = this.make.tilemap({ key: 'map' });
    const bgTileset = map.addTilesetImage("cave background", 'bgTiles');
    const tileset = map.addTilesetImage("cave tileset", 'tiles');
    map.createStaticLayer('Background', bgTileset, 0, 200);
    const platforms = map.createStaticLayer('Platforms', tileset, 0, 200);
    platforms.setCollisionByExclusion([-1]);
    this.player1 = new Player(this, 400, 400, 'player1');
    this.enemy1 = new Enemy(this, 300, 300, null);

    //Perhaps store all players in array and add colliders through iteration?
    this.player1.create();

    //Set player collision with platforms.
    this.physics.add.collider(this.player1, platforms);
    this.physics.add.collider(this.enemy1, platforms);

  }

  public update() {



    this.player1.update(this.cursor);
    // console.log(this.direction);
    if (this.cursor.P.isDown) {
      this.paused = !this.paused;
      if (this.paused) {
        this.scene.start(CST.SCENES.UI.PAUSE, { pause: "This is paused" })
      }
    }
  }
}
