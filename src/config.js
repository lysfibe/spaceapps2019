 
import Phaser from 'phaser'

export default {
  type: Phaser.AUTO,
  parent: 'content',
  width: 1200,
  height: 800,
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
    asteroid: 10,
    junker: 25,
    earth: 10000,
  },
  scale: {
    asteroid: [0.2, 0.2],
    junker: [1, 1],
    earth: [0.8, 0.8]
  }
}