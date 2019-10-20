import MatterSprite from '../types/MatterSprite'
import { earthAttractor } from '../utils/attractors'
import { DEFAULTS } from '../config'

export default class EarthSprite extends MatterSprite {
  constructor (props) {
    super({ 
        asset: 'earth',
        mass: DEFAULTS.mass.earth,
        scale: DEFAULTS.scale.earth,
        attractor: earthAttractor,
        shape: {
            type: 'circle',
            radius: 95,
        },
        ...props
    })
  }
}