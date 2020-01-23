import Phaser, {Game} from 'phaser'
import * as scenes from './scenes'

let config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  scene: [
    scenes.ThirdScene,
    scenes.FourthScene,
    scenes.RightDown,
    scenes.FirstBox,
    scenes.PBox,
    scenes.DoubleSwitch,
    scenes.FirstLoop
  ],
  parent: "game-canvas"
};

new Game(config);
