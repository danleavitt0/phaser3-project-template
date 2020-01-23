import Phaser from 'phaser'

export default class GridBody extends Phaser.GameObjects.Sprite {
  /**
   * 
   * @param {Object} config
   * @param {Phaser.Scene} config.scene 
   */
  constructor ({scene, gridX, gridY, texture}) {
    super(scene, gridX * scene.world.gridSize.x, gridY * scene.world.gridSize.y, texture)
    // this.scene.game.
    // this.scene = scene
    this.world = scene.world
    this.facing = Phaser.NONE
    this.setDepth(100)
    this.gridPosition = new Phaser.Geom.Point(gridX, gridY)
    this.isLocked = {
      x: false,
      y: false
    }
  
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
    // this.speed = Phaser.Physics.Arcade.

    this.setOrigin(0.5, 0.6)
    this.snapToGrid()
    scene.add.existing(this)
  }

  snapToGrid() {
    this.gridPosition = {
      x: Math.round(this.x / this.world.gridSize.x),
      y: Math.round(this.y / this.world.gridSize.y)
    };
    this.x = this.world.gridSize.x * this.gridPosition.x;
    this.y = this.world.gridSize.y * this.gridPosition.y;
  }

  checkPosition(x = 0, y = 0, que = []) {
    const vector = [x - this.gridPosition.x, y - this.gridPosition.y]
    const tile = this.scene.tileGroup.getChildren().find(tile => {
      const tileX = tile.getData('gridX')
      const tileY = tile.getData('gridY')
      if (tileY * 10 + tileX === y * 10 + x) {
        return true
      }
    })
    // console.log(tile, tile.getData('blocked'))
    if (!tile || tile.getData('blocked')) return false
    const boxes = this.scene.boxes.getChildren()
    if (boxes.length > 0) {
      const box = boxes.find(bot => {
        const boxX = bot.gridPosition.x
        const boxY = bot.gridPosition.y
        if (boxY * 10 + boxX === y * 10 + x) {
          return true
        }
      }) 
      if (box) {
        if (box.checkPosition(
          box.gridPosition.x + vector[0],
          box.gridPosition.y + vector[1]
        )) {
          return que.concat(box)
        } else {
          return false
        }
      }
    }
    if (this.scene.bots.length > 1) {
      const bot = this.scene.bots.find(bot => {
        const botX = bot.gridPosition.x
        const botY = bot.gridPosition.y
        if (botY * 10 + botX === y * 10 + x) {
          return true
        }
      }) 
      if (bot) return false
    }


    return true
  }

  animatedTurn (radians) {
    return new Promise((resolve) => {
      this.scene.tweens.add({
        targets: this,
        rotation: '+=' + radians,
        duration: this.scene.speed,
        onComplete: resolve
      })
    })
  }


  animatedGridMove(x = 0, y = 0) {
    return new Promise((resolve, reject) => {
      const position = this.checkPosition(x, y)
      if (!position) return reject()
      const vector = [
        (x - this.gridPosition.x) * this.world.gridSize.x,
        (y - this.gridPosition.y) * this.world.gridSize.y
      ]
      const gridVector = [x - this.gridPosition.x, y - this.gridPosition.y]
      const targets = Array.isArray(position) ? [this, ...position] : [this]
      targets.forEach(target => {
        target.gridPosition.x += gridVector[0]
        target.gridPosition.y += gridVector[1]
      })
      if (targets.length > (this.pushStrength || 2)) return reject()
      this.scene.tweens.add({
        targets,
        x: '+=' + vector[0],
        y: '+=' + vector[1],
        duration: this.scene.speed,
        onComplete: resolve
      })
    })
  }
}


