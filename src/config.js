 
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
    asteroid: [0.05, 0.05],
    junker: [0.7, 0.7],
    earth: [0.5, 0.5]
  }
}