import Phaser from 'phaser'
import { calculateAttraction } from '../utils/attractors'

export default class MatterSprite extends Phaser.Physics.Matter.Sprite {
    constructor ({ scene, x, y, asset, mass = 1, attractor }) {
        super(scene.matter.world, x, y, asset, null, {
            plugin: {
                attractors: [attractor].filter(Boolean)
            }
        })
        scene.add.existing(this)
        this.setMass(mass)
        this.setFriction(0)
        this._scene = scene
    }

    track() {
        const camera = this._scene.cameras.main

        camera.setLerp(0.1, 0.1)
        camera.startFollow(this)
    }
}