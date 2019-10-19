 
import Phaser from 'phaser'

export default {
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 600,
  localStorageName: 'thesunneversets',
  physics: {
    default: "matter",
    matter: {
        // debug: true
        gravity: {
          scale: 0,
        },
    },
  }
}

export const DEFAULTS = {
  mass: {
    asteroid: 5,
    junker: 10,
    earth: 10000,
  },
}