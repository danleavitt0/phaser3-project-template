import GridBody from './GridBody'
import Phaser from 'phaser'

export default class Bot extends GridBody {
  /**
   * 
   * @param {Object} config
   * @param {Phaser.Scene} config.scene 
   */
  constructor ({scene, gridX, gridY, facing = 0}) {
    // this.scene.game.
    super({scene, gridX, gridY, texture: 'cube'})
    this.world = this.scene.world
    // this.facing = facing
    this.setDepth(2)
    this.setRotation(degreesToRadians(facing))
  }
}

function degreesToRadians (degrees) {
  return degrees * (Math.PI / 180)
}

