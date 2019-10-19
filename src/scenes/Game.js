import Phaser from 'phaser'

import Earth from '../sprites/Earth'
import Asteroid from '../sprites/Asteroid'

export default class extends Phaser.Scene {
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

    this.asteroid = new Asteroid({
        scene: this,
        x: 400,
        y: 100,
        asset: 'asteroid',
    })

    // this.add.existing(this.earth)
    this.matter.add.image(400, 300, 'earth', null, { isStatic: true })
    this.matter.add.image(400, -100, 'asteroid')
  }
}