import { Scene } from 'phaser';
import { CST } from "../CST";
export class MenuScene extends Scene{
  constructor(){
    super({
      key: CST.SCENES.UI.MENU
    });
  }

  create(){
    this.scene.start(CST.SCENES.UI.PLAY)
  }
}