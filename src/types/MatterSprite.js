import Phaser from 'phaser'
import { calculateAttraction } from '../utils/attractors'

export default class MatterSprite extends Phaser.Physics.Matter.Sprite {
    constructor ({ scene, x, y, asset, mass = 1, attractor, scale, shape, velocity }) {
        super(scene.matter.world, x, y, asset, null, {
            shape,
            plugin: {
                attractors: [attractor].filter(Boolean)
            }
        })
        scene.add.existing(this)
        this.setMass(mass)

        this.setFrictionAir(0)
        this.setFriction(0)

        if (Array.isArray(scale)) {
            this.setScale(...scale)
        } else if (scale) {
            const { x, y } = scale
            this.setScale(x, y)
        }

        if (Array.isArray(velocity)) {
            this.setVelocity(...velocity)
        } else if (velocity) {
            const { x, y } = velocity
            this.setVelocity(x, y)
        }

        this._scene = scene
    }

    track() {
        const camera = this._scene.cameras.main

        camera.setLerp(0.1, 0.1)
        camera.startFollow(this)
    }

    wreck() {
        this.destroy()
        this.visible = false
    }
}