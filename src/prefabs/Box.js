import GridBody from "./GridBody";

export default class Box extends GridBody {
  constructor ({scene, gridX, gridY}, weight) {
    super({scene, gridX, gridY, texture: 'cube'})
    this.setScale(0.6)
    this.setTint(0xaabbcc)
    this.immovable = false
    this.setData('bodyType', 'box')
  }
}