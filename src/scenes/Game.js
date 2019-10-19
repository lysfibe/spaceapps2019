import Phaser from 'phaser'

import Earth from '../sprites/Earth'
import Asteroid from '../sprites/Asteroid'
import Junker from '../sprites/Junker'
import { bindKeymap } from '../utils/bind'
import { DEFAULTS } from '../config'

import physicsConfig from '../assets/physics.json'

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
    
    this.player = new Junker({ scene: this, x: 0, y: 200 })

    const movePlayer = (x, y) => {
        const force = new Phaser.Math.Vector2(x, y)
        this.player.applyForce(force)
    }

    // this.asteroids = [
    //     new Asteroid({ scene: this, x: 0, y: -100, asset: 'asteroid' }).setVelocityX(10)
    // ]
    this.asteroids = this.importAsteroids({scene:this})

    bindKeymap(this, keymap)
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

  importAsteroids({scene}){
    const data = require('../data/full.json')
    return data.map(d=>{
        new Asteroid({scene, x:d.x, y:d.y, velocityX:d.dx, velocityY:d.dy, asset: 'asteroid'})
    })
  }
}