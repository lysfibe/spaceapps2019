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
    }

    move (x, y) {
        const force = new Phaser.Math.Vector2(x, y)
        this.applyForce(force)
    }
}