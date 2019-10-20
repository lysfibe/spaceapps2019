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
        this.turnSpeed = 3
<<<<<<< HEAD
        this.thrustSpeed = 0.003
        this.magnetStrength = 0.001
        this.magnetOn = false
=======
        this.thrustSpeed = 0.003;
        
        this.repelModifier = 1
        this.repelTimeout = null
>>>>>>> Trigger push on asteroid collision
    }
    
    update(t, d) {
        super.update(t, d)
        if (!this.active) return
    }

    turn(degrees){
        if (!this.active) return
        if (this.expend(1)) {
            this.setAngle(this.angle + degrees*this.turnSpeed)
        }
    }

    move (x, y) {
        if (!this.active) return
        if (this.expend(2)) {
            const force = new Phaser.Math.Vector2(x, y)
            this.applyForce(force)
        }
    }

    moveThrust(force){
        if (!this.active) return
        if (this.expend(2)) {
            this.thrust(force*this.thrustSpeed)
        }
    }

    magnetise(){
        if (this.expend(1)) {
            this.magnetOn = true
        }
    }

    repelObjects(time) {
        if (!this.expend(250)) {
            return false
        }

        if (this.repelTimeout) {
            clearTimeout(this.repelTimeout)
        }

        this.repelModifier = -5
        this.repelTimeout = setTimeout(() => {
            this.repelModifier = 1
            this.repelTimeout = null
        }, time)

        return true
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