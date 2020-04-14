import * as Phaser from 'phaser'
import { config } from './config/config'

declare global {
  interface Window {
    game: Phaser.Game
  }
}

const game = new Phaser.Game(config)
window.game = game
