import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' })
    }

    preload() {
        console.log('loading assets')
        // Load assets here
    }

    update () {
        if (false) { // Change scene condition, post-load
            this.scene.start('SplashScene')
        }
    }
}