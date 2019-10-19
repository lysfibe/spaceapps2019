import MatterSprite from '../types/MatterSprite'
import { junkerAttractor } from '../utils/attractors'
import { DEFAULTS } from '../config'

export default class JunkerSprite extends MatterSprite {
    constructor(props) {
        super({ asset: 'junker', mass: DEFAULTS.mass.asteroid, attractor: junkerAttractor, ...props })
    }
}