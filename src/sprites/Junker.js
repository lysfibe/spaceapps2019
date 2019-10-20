import MatterSprite from '../types/MatterSprite'
import { junkerAttractor } from '../utils/attractors'
import { DEFAULTS } from '../config'

export default class JunkerSprite extends MatterSprite {
    constructor(props) {
        super({ 
            asset: 'junker',
            mass: DEFAULTS.mass.junker,
            scale: DEFAULTS.scale.junker,
            attractor: junkerAttractor,
            shape: {
                type: 'circle',
                radius: 14,
            },
            ...props
        })

        this.maxEnergy = 5000
        this.energy = this.maxEnergy
    }

    move (x, y) {
        if (this.expend(2)) {
            const force = new Phaser.Math.Vector2(x, y)
            this.applyForce(force)
        }
    }

    expend(amount) {
        if (this.energy < amount) {
            return false
        }
        this.energy -= amount
        return true
    }

    resetEnergy() {
        this.energy = this.maxEnergy
    }
}