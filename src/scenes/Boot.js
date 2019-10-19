import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' })
    }

    preload() {
        console.log('loading assets')
        this.load.image('earth', 'src/assets/pixel-earth.png');
        this.load.image('earth', 'src/assets/pixel-asteroid.png');
    }

    update () {
        if (false) { // Change scene condition, post-load
            this.scene.start('SplashScene')
        }
    }
}