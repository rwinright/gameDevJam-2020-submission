import { Scene } from 'phaser';

import { CST } from "../CST";
export class LoadScene extends Scene{
  constructor(){
    super({
      key: CST.SCENES.UI.LOAD
    });
  }
  create(){
    this.scene.start(CST.SCENES.UI.MENU);
  }
}