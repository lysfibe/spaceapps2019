import MatterSprite from '../types/MatterSprite'
import { DEFAULTS } from '../config'

export default class AsteroidSprite extends MatterSprite {
  constructor (props) {
    super({ 
      asset: 'asteroid', 
      mass: DEFAULTS.mass.asteroid, 
      scale: DEFAULTS.scale.asteroid,
      shape: {
        type: 'circle',
        radius: 50,
      },
      ...props
    })
  }
}
