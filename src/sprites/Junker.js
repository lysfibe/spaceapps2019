import MatterSprite from '../types/MatterSprite'
import { junkerAttractor } from '../utils/attractors'
import { DEFAULTS } from '../config'

export default class JunkerSprite extends MatterSprite {
    constructor(props) {
        const { scaleX, scaleY, velocityX, velocityY, ...rest } = props

        super({ asset: 'junker', mass: DEFAULTS.mass.junker, attractor: junkerAttractor, ...rest })
        this.setScale(
            scaleX ? scaleX : DEFAULTS.scale.junker.x,
            scaleY ? scaleY : DEFAULTS.scale.junker.y,
        )
        this.setVelocity(
            velocityX !== undefined ? velocityX : 0,
            velocityX !== undefined ? velocityX : 0,
        )
    }
}