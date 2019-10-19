import MatterSprite from '../types/MatterSprite'
import { junkerAttractor } from '../utils/attractors'

export default class JunkerSprite extends MatterSprite {
    constructor(props) {
        super({ asset: 'junker', attractor: junkerAttractor, ...props })
    }
}