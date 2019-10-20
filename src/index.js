import Phaser from 'phaser'

import BootScene from './scenes/Boot'
// import SplashScene from './scenes/Splash'
import GameScene from './scenes/Game'
import StartScene from './scenes/Start'
import EndScene from './scenes/End'

import config from './config'

const gameConfig = Object.assign(config, {
  scene: [BootScene, StartScene, GameScene, EndScene],
})

class Game extends Phaser.Game {
  constructor () {
    super(gameConfig)
  }
}

window.game = new Game()