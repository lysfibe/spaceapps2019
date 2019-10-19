import Phaser from 'phaser'

export default class MatterSprite extends Phaser.Physics.Matter.Sprite {
    constructor ({ scene, x, y, asset, mass = 1 }) {
        super(scene.matter.world, x, y, asset)
        scene.add.existing(this)
        console.log(asset, mass)
        this.setMass(mass)
        this._scene = scene
    }

    track() {
        const camera = this._scene.cameras.main

        camera.setLerp(0.1, 0.1)
        camera.startFollow(this)
    }
}