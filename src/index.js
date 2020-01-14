import IsometricScene from './scenes/FirstScene'
import TopDown1 from "./scenes/SecondScene";
import Phaser, {Game} from 'phaser'

let config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  pixelArt: true,
  scene: {
    preload,
    create
  },
  parent: "game-canvas"
};

function preload () {

}

function create () {
  console.log('here')
  this.scene.manager.scenes.forEach((scene, i) => {
    const key = scene.scene.key
    this.startButton = this.add.circle(100 + (i * 100), 100, 50, 0x303300, 1).setInteractive()
    this.add.text(85 + (i * 100), 107, key)
    this.startButton.on('pointerdown', () => this.scene.start(key))
  })

}

const game = new Game(config);
game.scene.add('IsometricScene', IsometricScene)
game.scene.add('TopDown1', TopDown1)
