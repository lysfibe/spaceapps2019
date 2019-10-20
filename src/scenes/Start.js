import Phaser from 'phaser'
import { bindKeymap } from '../utils/bind'

export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' })
    }

    create() {
        this.plinth = this.add.image(600, 400, 'scene-start')
        const keymap = {
            SPACE: {},
        }

        bindKeymap(this, keymap)
    }

    update () {
        if (this._spaceKey.isDown) {
            this.scene.start('GameScene')
        }
    }
}