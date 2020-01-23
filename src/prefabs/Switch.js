import {GameObjects} from 'phaser'
import GridBody from './GridBody'

export default class SwitchPlate extends GridBody {
  constructor ({scene, gridX, gridY}, target, countdown = 1) {
    super({scene, gridX, gridY, texture: 'isoCube'})
    this.countdownLength = countdown
    this.target = target
    this.immovable = true
    this.active = false
    const text = this.scene.add.text(
      Math.floor(this.x + this.width / 8),
      Math.floor(this.y + this.height / 8 - 4),
      '' + this.scene.switchNumber++,
      {color: '#333'}
    )
    text.setDepth(1).setOrigin(1)
    this.setDepth(1)
  }

  checkIntersection (source) {
    if (source.gridPosition.x === this.gridPosition.x && source.gridPosition.y === this.gridPosition.y) {
      return true
    }
    return false
  }

  activate () {
    this.active = true
    this.startedAtStep = this.scene.steps
    this.stepsUntilUndone = this.countdownLength
    this.originalTint = this.tint
    this.setTint(0x154a5b)
    return this.target.activate()
  }

  deactivate () {
    this.active = false
    this.setTint(this.originalTint)
    return this.target.deactivate()
  }

  update (step) {
    if (
      this.scene.bots.some(bot => this.checkIntersection(bot)) ||
      this.scene.boxes.getChildren().some(box => this.checkIntersection(box))
    ) {
      return this.activate()
    } else {
      this.stepsUntilUndone--
      if (this.stepsUntilUndone <= 0) {
        return this.deactivate()
      }
    }
  }
}