import { Scene } from "phaser";
import { CST } from "../CST";

export default class PauseScene extends Scene{
  constructor(){
    super({
      key: CST.SCENES.UI.PAUSE
    })
  }

  cursor: any;

  init(data: any){
    console.log(data.pause);
  }

  preload(){
    this.cursor = this.input.keyboard.addKeys("W, S, P");
  }

  create(){
    
  }

  update(){
    if(this.cursor.P.isDown) this.scene.start(CST.SCENES.UI.PLAY, {play: "Resume play"})
    if(this.cursor.W.isDown) console.log("Arrow up");
    if(this.cursor.S.isDown) console.log("Arrow down");
  }
}