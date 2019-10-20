import Phaser from 'phaser'

import Earth from '../sprites/Earth'
import Asteroid from '../sprites/Asteroid'
import Junker from '../sprites/Junker'
import { bindKeymap } from '../utils/bind'
import { DEFAULTS } from '../config'

import asteroidData from '../data/full.json'
import physicsConfig from '../assets/physics.json'
import { earthCollider } from '../utils/colliders'

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
      x: 0,
      y: 0,
      mass: 100000,
    })

    this.earth.track()

    this.player = new Junker({ scene: this, x: 0, y: 200 })
   
    const keymap = {
        SPACE: {
            down: () => this._toggleTrack(),
        },
        UP: {
            down: () => this.player.move(0, -0.01),
        },
        DOWN: {
            down: () => this.player.move(0, 0.01)
        },
        LEFT: {
            down: () => this.player.move(-0.01, 0)
        },
        RIGHT: {
            down: () => this.player.move(0.01, 0)
        },
    }

    this.asteroids = this.importAsteroids({scene:this})

    bindKeymap(this, keymap)

    const colliders = [
        earthCollider,
    ]
    this.matter.world.on('collisionstart', (a, b, c) => {
        colliders.reduce((handled, current) => handled || current(b, c), false)
    })
  }


  update() {
    if (this._upKey.isDown) { this.player.move(0, -0.005) }
    if (this._downKey.isDown) { this.player.move(0, 0.005) }
    if (this._leftKey.isDown) { this.player.move(-0.005, 0) }
    if (this._rightKey.isDown) { this.player.move(0.005, 0) }
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

    importAsteroids({ scene }) {
        return asteroidData.map(d => new Asteroid({ scene, x: d.x, y: d.y, velocity: { x: d.dx, y: d.dy } }))
    }
}