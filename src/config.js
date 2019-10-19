 
import Phaser from 'phaser'
import PathFollowerPlugin from './plugins/pathfollower-plugin.js'

export default {
  type: Phaser.AUTO,
  parent: 'content',
  width: 625,
  height: 900,
  localStorageName: 'phaseres6webpack',
  plugins: {
    global: [{
        key: 'pathFollower',
        plugin: PathFollowerPlugin,
        start: true
      },
    ],
  },
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: {
        scale: 0,
      }
    }
  }
}