import Phaser from 'phaser'

import Earth from '../sprites/Earth'
import Asteroid from '../sprites/Asteroid'
import Junker from '../sprites/Junker'
import { bindKeymap } from '../utils/bind'

export default class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }
  init () {}
  preload () {}

  create () {
    this.matter.enableAttractorPlugin()

    this.earth = new Earth({
      scene: this,
      x: 400,
      y: 300,
      mass: 100000,
    })

    const keymap = {
        SPACE: {
            down: () => this._toggleTrack(),
        },
        UP: {
            down: () => movePlayer(0, -0.01)
        },
        DOWN: {
            down: () => movePlayer(0, 0.01)
        },
        LEFT: {
            down: () => movePlayer(-0.01, 0)
        },
        RIGHT: {
            down: () => movePlayer(0.01, 0)
        },
    }
    
    this.player = new Junker({ scene: this, x: 500, y: 200 })

    const movePlayer = (x, y) => {
        const force = new Phaser.Math.Vector2(x, y)
        this.player.applyForce(force)
    }

    this.asteroids = [
        new Asteroid({ scene: this, x: 100, y: 200, asset: 'asteroid' })
    ]

    bindKeymap(this, keymap)
  }


  update() {
      console.log(this.player)
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