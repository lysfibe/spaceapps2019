import Phaser from 'phaser'

import Earth from '../sprites/Earth'
import Asteroid from '../sprites/Asteroid'
import Junker from '../sprites/Junker'
import { bindKeymap } from '../utils/bind'
import { DEFAULTS } from '../config'

import asteroidData from '../data/full.json'
import { earthCollider, asteroidShipCollider } from '../utils/colliders'
import CashTracker from '../ui/CashTracker'
import EnergyBar from '../ui/EnergyBar'
import Leaderboard from '../ui/Leaderboard'

export default class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }
  init () {}
  preload () {
      this.hudcontainer = document.getElementById('hud')
  }

  create () {
    this.ui = {
        energy: new EnergyBar(),
        cash: new CashTracker(),
        leaderboard: new Leaderboard(),
    }

    Object.values(this.ui).forEach(c => c.mount(this.hudcontainer))

    this.matter.enableAttractorPlugin()
    
    this.earth = new Earth({
      scene: this,
      x: 0,
      y: 0,
      z: 2,
      mass: 100000,
    })

    this.earth.track()

    this.player = new Junker({ scene: this, x: 0, y: -50, z: 1, velocity:{x:0.5,y:0.1} })
   
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
        SHIFT: {
            down: () => this.player.magnetise(),
            up: () => this.player.magnetOn = false
        }
    }

    this.asteroids = this.importAsteroids({scene: this})

    bindKeymap(this, keymap)

    const colliders = [
        earthCollider,
        asteroidShipCollider,
    ]
    this.matter.world.on('collisionstart', (ctx, entityA, entityB) => {
        colliders.reduce((handled, current) => handled || current(this, entityA, entityB), false)
    })
  }

    update(t, d) {
        if (!this.player.active) {
            this.earth.track()
        }

        if (this._upKey.isDown) { this.player.moveThrust(1) }
        if (this._downKey.isDown) { this.player.moveThrust(-1) }
        if (this._leftKey.isDown) { this.player.turn(-1) }
        if (this._rightKey.isDown) { this.player.turn(1) }
        if (this._shiftKey.isDown) { this.player.magnetise() }

        this.player.update(t, d)

        this.ui.energy.update(Math.floor((this.player.energy / this.player.maxEnergy ) * 100))
        this.ui.cash.update(this.player.wonga)
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

    onLose() {
        this.earth.track()
        this.player.wreck()
        this.ui.leaderboard.add(this.player.wonga)
    }

    importAsteroids({ scene }) {
        return asteroidData.map(d => new Asteroid({
            asset: this.getJunkType(d),
            scene,
            x: d.x,
            y: d.y,
            z: 0,
            velocity: { x: d.dx/2, y: d.dy/2 }
        }))
    }

    getJunkType(item){
        //let junkTypes = ['asteroid-screw', 'asteroid-can', 'asteroid-satellite'];
        //let randomNumber = Math.floor(Math.random()*junkTypes.length);
        //return junkTypes[randomNumber];
        if (item['OBJECT_TYPE'] === 'PAYLOAD') return 'asteroid-satellite'
        if (item['OBJECT_TYPE'] === 'ROCKET BODY') return 'asteroid-can'
        return 'asteroid-screw'
    }
}