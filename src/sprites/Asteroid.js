import Phaser from 'phaser'
import MatterSprite from '../types/MatterSprite'

export default class extends MatterSprite {
  constructor (props) {
    super({ asset: 'asteroid', mass: 3, ...props })
  }
}