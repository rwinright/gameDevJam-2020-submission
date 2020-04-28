import Walker from "./Walker";
import * as helpers from '../Helpers';


export default class Jumper extends Walker {
    jumperTimer: number = 0;
    jumpTrigger: number = helpers.GetRandom(20, 50);
    constructor(scene: any, x: number, y: number, texture: any, EnemyGroup: any) {
        super(scene, x, y, texture, EnemyGroup);
    }

    update() {
        super.update();
        this.moveHorizontal();
        this.jumperTimer++;
        if (this.jumpTrigger < this.jumperTimer && this.body.blocked.down) {
            this.setVelocityY(helpers.GetRandom(-400, -800));
            this.jumperTimer = 0;
        }
    }
}