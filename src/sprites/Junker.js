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
        this.name = 'junker'

        this.maxEnergy = 5000
        this.energy = this.maxEnergy
        this.wonga = 0
    }
    
    update(t, d) {
        super.update(t, d)
        if (!this.active) return

        const { velocity } = this.body
        if (velocity.x !== 0 && velocity.y !== 0) {
            const angle = Math.atan2(velocity.x, -velocity.y)
            this.setRotation(angle)
        } else {
            this.setRotation(0)
        }
    }

    move (x, y) {
        if (!this.active) return
        if (this.expend(2)) {
            const force = new Phaser.Math.Vector2(x, y)
            this.applyForce(force)
        }
    }

    expend(amount) {
        if (!this.active) return false
        if (this.energy < amount) {
            return false
        }
        this.energy -= amount
        return true
    }

    kaching(dolla) {
        this.wonga += dolla
    }

    resetEnergy() {
        this.energy = this.maxEnergy
    }
}