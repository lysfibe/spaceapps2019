import Phaser from 'phaser'

import Earth from '../sprites/Earth'
import Asteroid from '../sprites/Asteroid'
import Junker from '../sprites/Junker'

export default class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }
  init () {}
  preload () {}

  create () {
    this.earth = new Earth({
      scene: this,
      x: 400,
      y: 300,
      asset: 'earth'
    })

    
    this.player = new Junker({ scene: this, x: 500, y: 200, asset: 'junker' })

    this.spaceKey = this.input.keyboard.addKey('SPACE')
    this.spaceKey.on('down', () => this._toggleTrack())
  }

  _toggleTrack() {
        switch(this._tracked) {
            case 'player': {
                this.earth.track()
                this._tracked = 'earth'
                break
            }
            case 'earth':
            default: {
                this.player.track()
                this._tracked = 'player'
                break;
            }
        }
  }
}