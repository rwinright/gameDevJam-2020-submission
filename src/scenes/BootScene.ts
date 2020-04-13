import { Scene } from 'phaser'

import logo from '../assets/logo.png'
import { CST } from '../CST'
//The scene that displays the game studio logo/name
export default class BootScene extends Scene {
  constructor() {
    super({ 
      key: CST.SCENES.UI.BOOT 
    });
  }
  create(){
    this.scene.start(CST.SCENES.UI.LOAD);
  }
}
