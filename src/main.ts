import * as Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import { LoadScene } from './scenes/LoadScene'
import { MenuScene } from './scenes/MenuScene';
import PauseScene from './scenes/PauseScene';

declare global {
  interface Window {
    game: Phaser.Game
  }
}

const config: GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 800
      },
      debug: true
    }
  },
  scene: [BootScene, LoadScene, MenuScene, PauseScene, PlayScene],
}

const game = new Phaser.Game(config)
window.game = game
