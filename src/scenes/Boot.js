import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' })
    }

    preload() {
        console.log('loading assets')
        this.load.image('earth', 'src/assets/pixel-earth.png');
        this.load.image('asteroid', 'src/assets/pixel-asteroid.png');
    }

    create() {
        this.matter.world.setBounds()

        const asteroid = this.matter.add.image(400, 500, 'asteroid', null, {
            shape: {
                type: 'circle',
                radius: 100
            }
        }).setScale(0.1, 0.1)

        var curve = new Phaser.Curves.Ellipse(400, 300, 200);
        var path = new Phaser.Curves.Path();

        path.add(curve)

        var pathFollower = this.plugins.get('pathFollower').add(asteroid, {
            path: path,
            t: 0
        })

        const tween = this.tweens.add({
            targets: pathFollower,
            t: 1,
            ease: 'Ease-In-Out', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: -1,
            yoyo: true
        });

        const earth = this.matter.add.image(400, 300, 'earth', null, {
            shape: {
                type: 'circle',
                radius: 120
            },
        }).setScale(0.5, 0.5)

        // this.matter.world.setBounds(0, 0, game.config.width, game.config.height)
    }

    update () {
        if (false) { // Change scene condition, post-load
            this.scene.start('SplashScene')
        }
    }
}