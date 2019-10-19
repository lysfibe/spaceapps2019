 
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
      // debug: true,
      gravity: {
        scale: 0,
      },
    },
  }
}

export const DEFAULTS = {
  mass: {
    asteroid: 50,
    junker: 30,
    earth: 10000,
  },
  scale: {
    asteroid: {
      x: 0.05,
      y: 0.05
    },
    junker: {
      x: 0.7,
      y: 0.7
    },
    earth: {
      x: 0.5,
      y: 0.5
    }
  }
}