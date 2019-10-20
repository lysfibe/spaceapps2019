import Phaser from 'phaser'

import Earth from '../sprites/Earth'
import Asteroid from '../sprites/Asteroid'
import Junker from '../sprites/Junker'
import { bindKeymap } from '../utils/bind'
import { DEFAULTS } from '../config'

import asteroidData from '../data/full.json'
import physicsConfig from '../assets/physics.json'
import { earthCollider } from '../utils/colliders'
import { timingSafeEqual } from 'crypto'

class EnergyBar {
    constructor() {
        this.container = document.createElement('div')
        this.container.classList.add('healthbar-container')
        this.bar = document.createElement('div')
        this.bar.classList.add('healthbar')

        this.container.appendChild(this.bar)
    }

    mountInto(container) {
        container.appendChild(this.container)
    }

    update(percent) {
        this.bar.style.width = `${ percent }px`
    }
}

class CashMoney {
    constructor() {
        this.container = document.createElement('div')
        this.container.classList.add('cashmoney-container')
        this.cash = document.createElement('span')
        this.cash.classList.add('cashmoney')
        this.cash.textContent = '¥0'

        this.container.appendChild(this.cash)
    }

    mountInto(container) {
        container.appendChild(this.container)
    }

    update(value) {
        this.cash.textContent = `¥${ value }`
    }
}

export default class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }
  init () {}
  preload () {
      this.hudcontainer = document.getElementById('hud')
  }

  create () {
    this.energy = new EnergyBar()
    this.energy.mountInto(this.hudcontainer)
    this.cashtracker = new CashMoney()
    this.cashtracker.mountInto(this.hudcontainer)

    this.matter.enableAttractorPlugin()
    
    this.earth = new Earth({
      scene: this,
      x: 0,
      y: 0,
      mass: 100000,
    })

    this.earth.track()

    this.player = new Junker({ scene: this, x: 0, y: -50, velocity:{x:0.5,y:0.1} })
   
    const keymap = {
        SPACE: {
            down: () => this._toggleTrack(),
        },
        UP: {
            down: () => this.player.moveThrust(1),
        },
        DOWN: {
            down: () => this.player.moveThrust(-1)
        },
        LEFT: {
            down: () => this.player.turn(-1)
        },
        RIGHT: {
            down: () => this.player.turn(1)
        },
    }

    this.asteroids = this.importAsteroids({scene: this})

    bindKeymap(this, keymap)

    const colliders = [
        earthCollider,
    ]
    this.matter.world.on('collisionstart', (ctx, entityA, entityB) => {
        colliders.reduce((handled, current) => handled || current(this, entityA, entityB), false)
    })
  }

    update(t, d) {
        if (this._upKey.isDown) { this.player.moveThrust(1) }
        if (this._downKey.isDown) { this.player.moveThrust(-1) }
        if (this._leftKey.isDown) { this.player.turn(-1) }
        if (this._rightKey.isDown) { this.player.turn(1) }

        this.player.update(t, d)

        this.energy.update(Math.floor((this.player.energy / this.player.maxEnergy ) * 100))
        this.cashtracker.update(this.player.wonga)

        console.log("The player is %d units away from the Earth", this.player.mapTo(this.earth).distance)
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
        return asteroidData.map(d => new Asteroid({ scene, x: d.x, y: d.y, velocity: { x: d.dx/2, y: d.dy/2 } }))
    }
}