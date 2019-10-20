import Phaser from 'phaser'
import { bindKeymap } from '../utils/bind'

export default class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' })
    }

    create() {
        this.plinth = this.add.image(600, 400, 'scene-end')
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