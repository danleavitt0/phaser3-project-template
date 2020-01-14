import Phaser from 'phaser'
import {MoverMixin} from './behavior'

export default class Bot extends Phaser.GameObjects.Sprite {
  constructor ({scene, x, y}) {
    super(scene, x, y, 'cube')
    this.world = scene.world
    this.facing = Phaser.NONE
    this.gridPosition = new Phaser.Geom.Point(x, y)
    /**
     * @property {number} width - The calculated width of the physics body in grid units. Default match sprite size.
     * @readonly
     */
    // this.width = Math.round(this.width / this.world.gridSize.x);
    
    /**
     * @property {number} height - The calculated height of the physics body in grid units. Default match this size.
     * @readonly
     */
    // this.height = Math.round(this.height / this.world.gridSize.y);
    this.setOrigin(0, 0)
    this.snapToGrid()
    scene.add.sprite(this)
  }

  snapToGrid() {
    this.gridPosition = {
      x: Math.round(this.x / this.world.gridSize.x),
      y: Math.round(this.y / this.world.gridSize.y)
    };
    this.x = this.world.gridSize.x * this.gridPosition.x;
    this.y = this.world.gridSize.y * this.gridPosition.y;
    console.log(this.x, this.y)
  }

  setGridPosition(x = 0, y = 0) {
    this.gridPosition.x = x;
    this.gridPosition.y = y;
    this.x = this.world.gridSize.x * this.gridPosition.x;
    this.y = this.world.gridSize.y * this.gridPosition.y;
    this.isLocked.x = false;
    this.isLocked.y = false;
  }
}


