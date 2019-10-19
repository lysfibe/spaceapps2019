import Phaser from 'phaser'
import MatterSprite from '../types/MatterSprite'
import { DEFAULTS } from '../config'

export default class AsteriodSprite extends MatterSprite {
  constructor (props) {
    super({ asset: 'asteroid', mass: DEFAULTS.mass.asteroid, ...props })
  }
}