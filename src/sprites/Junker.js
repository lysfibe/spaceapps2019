import Phaser from 'phaser'

export default class extends Phaser.Physics.Matter.Sprite {
  constructor ({ scene, x, y, asset }) {
    super(scene.matter.world, x, y, asset)
    
    scene.add.existing(this)

    this._scene = scene
  }

  track() {
      const camera = this._scene.cameras.main
      
      camera.setLerp(0.1, 0.1)
      camera.startFollow(this)
  }
}