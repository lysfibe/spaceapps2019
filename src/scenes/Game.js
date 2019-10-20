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

class Leaderboard {
    constructor() {
        const leaderboardFromStore = localStorage.getItem('leaderboard')
        this.records = leaderboardFromStore
            ? JSON.parse(leaderboardFromStore)
            : new Array(10).fill(0)

        this.container = document.createElement('div')
        this.container.classList.add('leaderboard-container')
        this.leaderboardList = document.createElement('ul')
        this.leaderboardListItems = this.records.forEach((score, position) => {
            const listItem = document.createElement('li')
            const positionText = document.createElement('span')
            positionText.textContent = position + 1
            const scoreText = document.createElement('span')
            scoreText.textContent = score > 0 ? score : '...'
            listItem.appendChild(positionText)
            listItem.appendChild(scoreText)
            this.leaderboardList.appendChild(listItem)
        })
        this.container.appendChild(this.leaderboardList)
    }

    update() {
        this.leaderboardList.querySelectorAll('li span:last-child').forEach((record, index) => {
            record.textContent = this.records[index]
        })
    }

    mountInto(container) {
        container.appendChild(this.container)
    }

    // returns true if new record, false if not
    addRecord(value) {
        let isNewRecord = false
        for (let i = 0; i < 10; i++) {
            if (value > this.records[i]) {
                this.records.splice(i, 0, value)
                this.records = this.records.slice(0, 9)
                this.saveToLocalStorage()
                this.update()
                isNewRecord = true
                break;
            }
        }
 
        return isNewRecord
    }

    saveToLocalStorage() {
        localStorage.setItem('leaderboard', JSON.stringify(this.records))
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
    this.leaderboard = new Leaderboard()
    this.leaderboard.mountInto(this.hudcontainer)

    this.matter.enableAttractorPlugin()
    
    this.earth = new Earth({
      scene: this,
      x: 0,
      y: 0,
      mass: 100000,
    })

    this.earth.track()

    this.player = new Junker({ scene: this, x: 0, y: -40, velocity:{x:0,y:-0.5} })
   
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
        if (!this.player.active) {
            this.earth.track()
        }

        if (this._upKey.isDown) { this.player.move(0, -0.005) }
        if (this._downKey.isDown) { this.player.move(0, 0.005) }
        if (this._leftKey.isDown) { this.player.move(-0.005, 0) }
        if (this._rightKey.isDown) { this.player.move(0.005, 0) }

        this.player.update(t, d)

        this.energy.update(Math.floor((this.player.energy / this.player.maxEnergy ) * 100))
        this.cashtracker.update(this.player.wonga)
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
        this.leaderboard.addRecord(this.player.wonga)
    }

    importAsteroids({ scene }) {
        return asteroidData.map(d => new Asteroid({
            asset: this.getJunkType(),
            scene,
            x: d.x,
            y: d.y,
            velocity: { x: d.dx/2, y: d.dy/2 }
        }))
    }

    getJunkType(){
        let junkTypes = ['asteroid-screw', 'asteroid-can', 'asteroid-satellite'];
        let randomNumber = Math.floor(Math.random()*junkTypes.length);
        return junkTypes[randomNumber];
    }
}