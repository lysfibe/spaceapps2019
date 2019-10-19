import MatterSprite from '../types/MatterSprite'
import { earthAttractor } from '../utils/attractors'
import { DEFAULTS } from '../config'

export default class EarthSprite extends MatterSprite {
  constructor (props) {
    const { scaleX, scaleY, ...rest } = props

    super({ asset: 'earth', mass: DEFAULTS.mass.earth, attractor: earthAttractor, ...rest })
      .setScale(
          scaleX ? scaleX : DEFAULTS.scale.earth.x,
          scaleY ? scaleY : DEFAULTS.scale.earth.y,
      )
  }
}