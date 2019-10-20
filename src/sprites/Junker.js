import MatterSprite from '../types/MatterSprite'
import { junkerAttractor } from '../utils/attractors'
import { DEFAULTS } from '../config'

export default class JunkerSprite extends MatterSprite {
    constructor(props) {
        const { scaleX, scaleY, ...rest } = props

        super({ asset: 'junker', mass: DEFAULTS.mass.junker, attractor: junkerAttractor, ...rest })
            .setScale(
                scaleX ? scaleX : DEFAULTS.scale.junker.x,
                scaleY ? scaleY : DEFAULTS.scale.junker.y,
            )
    }

    move (x, y) {
        const force = new Phaser.Math.Vector2(x, y)
        this.applyForce(force)
    }
}