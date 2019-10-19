import Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' })
    }

    preload() {
        console.log('loading assets')
        this.load.image('earth', 'src/assets/pixel-earth.png');
        this.load.image('asteroid', 'src/assets/pixel-asteroid.png');
        this.load.image('junker', 'src/assets/junk-collector.png');
    }

    update () {
        // if (false) { // Change scene condition, post-load
            this.scene.start('GameScene')
        // }
    }
}