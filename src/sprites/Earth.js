import MatterSprite from '../types/MatterSprite'
import { earthAttractor } from '../utils/attractors'

export default class EarthSprite extends MatterSprite {
  constructor (props) {
    super({ asset: 'earth', attractor: earthAttractor, ...props })
  }
}