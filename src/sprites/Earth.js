import Phaser from 'phaser'
import MatterSprite from '../types/MatterSprite'

export default class EarthSprite extends MatterSprite {
  constructor (props) {
    super({ asset: 'earth', ...props })
  }
}