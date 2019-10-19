import Phaser from 'phaser'
import MatterSprite from '../types/MatterSprite'
import { DEFAULTS } from '../config'

export default class AsteriodSprite extends MatterSprite {
  constructor (props) {
    const { scaleX, scaleY, ...rest } = props

    super({ asset: 'asteroid', mass: DEFAULTS.mass.asteroid, ...rest })
      .setScale(
        scaleX ? scaleX : DEFAULTS.scale.asteroid.x,
        scaleY ? scaleY : DEFAULTS.scale.asteroid.y,
      )
  }
}