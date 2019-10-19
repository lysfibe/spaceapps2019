import Phaser from 'phaser'
import MatterSprite from '../types/MatterSprite'

export default class JunkerSprite extends MatterSprite {
    constructor(props) {
        super({ asset: 'junker', ...props })
    }
}