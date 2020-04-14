import { Scene } from 'phaser';
import { CST } from "../../CST";
export default class MenuScene extends Scene{
  constructor(){
    super({
      key: CST.SCENES.UI.TITLE
    });
  }

  create(){
    this.scene.start(CST.SCENES.UI.TITLE)
  }
}