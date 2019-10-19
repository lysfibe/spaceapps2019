import Phaser from "phaser";
import MatterSprite from "../types/MatterSprite";
import { DEFAULTS } from "../config";

export default class AsteriodSprite extends MatterSprite {
  constructor(props) {
    const { scaleX, scaleY, velocityX, velocityY, ...rest } = props;

    super({ asset: "asteroid", mass: DEFAULTS.mass.asteroid, ...rest });
    this.setScale(
      scaleX ? scaleX : DEFAULTS.scale.asteroid.x,
      scaleY ? scaleY : DEFAULTS.scale.asteroid.y
    );
    this.setVelocity(
      velocityX !== undefined ? velocityX : 0,
      velocityX !== undefined ? velocityX : 0
    );
  }
}
