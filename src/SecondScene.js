import Phaser, { Scene, Game } from "phaser";
import isoBlocksImg from "./assets/atlas/isoblocks.png";
import workspace, {codeBuilder} from './blocklySetup1';
import isoJson from "./assets/atlas/isoblocks.json";
import IsoPlugin from "phaser3-plugin-isometric";
import Interpreter from 'js-interpreter';
import cubeImg from "./assets/cube2.png";
import tileImg1 from './assets/sprite_0.png'
import tileImg2 from './assets/sprite_1.png'

const levelLayout = [
  [1, 2, 1, 1, 1],
  [1, 0, 0, 1, 1],
  [1, 0, 0, 1, 1],
  [1, 3, 1, 1, 1],
  [1, 1, 1, 1, 1]
];

const SPEED = 300

export class SecondScene extends Scene {
  constructor() {
    super({
      key: "2DExample",
    });
    this.size = levelLayout.length - 1
    this.characterX = 1;
    this.characterY = 4;
    this.workspace = workspace
    this.running = false;
  }

  nextStep () {
    const step = this.interpreter.step()
    if (step && this.running) {
      window.setTimeout(this.nextStep.bind(this), 10);
    }
  }

  preload() {
    this.load.image("tile1", tileImg1)
    this.load.image("tile2", tileImg2)
    this.load.image("cube", cubeImg);
  }

  up (n = 1) {
    if (this.characterY - 1 < 0) {
      this.characterY = 0
    } else {
      this.characterY -= 1;
    }
    this.renderCharacter();
  }

  down (n = 1) {
    if (this.characterY + 1 > this.size) {
      this.characterY = this.size
    } else {
      this.characterY += 1;
    }
    this.renderCharacter();
  }

  right (n = 1) {
    if (this.characterX + 1 > this.size) {
      this.characterX = this.size
    } else {
      this.characterX += 1
    }
    this.renderCharacter();
  }

  pickUp () {
    const locationData = levelLayout[this.characterY][this.characterX]
    if (locationData === 3) {
      this.carrying = true
      this.characterSpriteGroup.add(this.dataCube, true)
    }
    this.renderCharacter();
  }

  drop () {
    if (this.carrying) {
      this.carrying = false
      this.characterSpriteGroup.remove(this.dataCube)
      this.tweens.add({
        targets: this.dataCube,
        x: this.characterX * 50,
        y: this.characterY * 50,
        duration: SPEED - 200
      })
    }
    this.renderCharacter()
  }

  left (n = 1) {
    if (this.characterX - 1 < 0) {
      this.characterX = 0
    } else {
      this.characterX -= 1
    }
    this.renderCharacter();
  }

  reset () {
    this.running = false;
    this.scene.start()
    this.characterX = 0
    this.characterY = 4
  }

  lost () {
    this.scene.pause()
    this.running = false;
    alert('you lost')
    this.reset()
  }

  onComplete () {
    this.running = false;
    this.scene.pause()
    alert('done')
  }

  run () {
    this.scene.start()
    this.characterX = 1;
    this.characterY = 4;
    this.running = true;
    const code = codeBuilder()
    this.interpreter = new Interpreter(code, this.initApi.bind(this));
    this.nextStep();
  }

  stop () {
    this.running = false
  }

  create() {
    // Set the origin of the isometric projection to the mid top of the screen

    this.tileGroup = this.add.group();
    this.startButton = this.add.circle(-100, -100, 50, 0x303300, 1).setInteractive()
    this.add.text(-115, -107, 'Run')
    this.startButton.on('pointerdown', () => this.run())

    this.stopButton = this.add.circle(10, -100, 50, 0x330000, 1).setInteractive()
    this.add.text(-7, -107, 'Stop')
    this.stopButton.on('pointerdown', () => this.stop())
    this.characterSpriteGroup = this.add.group()

    // Even though the children are added back to front, it is sorted the right way
    // because depth value is set on the IsoSprites and Phaser 3 sorts after that by default.

    // Create a cube using the new isoSprite factory method at the specified position.
    this.spawnTiles();
    this.characterSprite = this.add.sprite(
      this.characterX * 50,
      (this.characterY * 50) - 3,
      "cube"
    )
    this.characterSpriteGroup.add(this.characterSprite)

    this.characterSprite.depth = 1
    // this.cameras.main.zoom = 1;
    this.cameras.main.scrollY = -200;
    this.cameras.main.scrollX = -200;
    // Add a tween so we can see the depth sorting works on updates
  }

  spawnData (x, y) {
    this.dataCube = this.add.sprite(x * 50, y * 50, 'cube').setTint(0x2CAA22).setScale(0.72).setDepth(2).setData('xy', [x, y])
  }

  renderCharacter() {
    // this.characterSprite.isoX = this.characterX * 38;
    // this.characterSprite.isoY = this.characterY * 38;
    const maybeDoMoreThings = () => {
      const characterLocationValue = levelLayout[this.characterY][this.characterX]
      if (characterLocationValue === 0) {
        this.characterSpriteGroup.setDepth(-2)
        return this.tweens.add({
          targets: this.characterSpriteGroup.getChildren(),
          y: this.characterY * 50 + 100,
          duration: 2000,
          scaleX: 0,
          scaleY: 0,
          // easeParams: [3.5],
          ease: 'Quad',
          onComplete: () => this.lost(),
          repeat: 0
        })
      }
      this.characterSpriteGroup.getChildren().forEach(block => block.setData('xy', [this.characterX, this.characterY])) 
    }
    this.tweens.add({
      targets: this.characterSpriteGroup.getChildren(),
      x: this.characterX * 50,
      y: (this.characterY * 50) - 3,
      duration: SPEED - 200,
      onComplete: maybeDoMoreThings
    })

  }

  spawnTiles() {
    levelLayout.forEach((row, y) => {
      row.forEach((column, x) => {
        var tile = this.add.sprite(
          x * 50,
          y * 50,
          (x + y) % 2 === 0 ? "tile1" : "tile2",
          // "block-058"
        );
        tile.setData("row", x);
        tile.setData("col", y);
        // tile.depth = -1;

        tile.setInteractive();

        if (!column) {
          tile.destroy();
        } else if (column === 2) {
          this.dropPoint = [x, y]
          tile.setTint(0xF4F396)
        } else if (column === 3) {
          this.spawnData(x, y)
        }

        // tile.setDepth(centerY + rowNum + columnNum);
      });
    });
  }

  initApi (interpreter, scope) {
    let wrapper = (n, callback) => {
      this.up(n)
      return setTimeout(callback, SPEED)
    }
    interpreter.setProperty(scope, 'up',
        interpreter.createAsyncFunction(wrapper));
  
    // Add an API function for the prompt() block.
    wrapper = (n, callback) => {
      this.right(n)
      return setTimeout(callback, SPEED)
    };
    
    interpreter.setProperty(scope, 'right',
        interpreter.createAsyncFunction(wrapper));
    wrapper = (n, callback) => {
      this.down(n)
      return setTimeout(callback, SPEED)
    };
    
    interpreter.setProperty(scope, 'down',
        interpreter.createAsyncFunction(wrapper));
    wrapper = (n, callback) => {
      this.left(n)
      return setTimeout(callback, SPEED)
    };
    
    interpreter.setProperty(scope, 'left',
        interpreter.createAsyncFunction(wrapper));

    wrapper = (callback) => {
      this.pickUp()
      return setTimeout(callback, SPEED)
    };
    
    interpreter.setProperty(scope, 'pickUp',
        interpreter.createAsyncFunction(wrapper));
    wrapper = (callback) => {
      this.drop()
      return setTimeout(callback, SPEED)
    };
    
    interpreter.setProperty(scope, 'drop',
        interpreter.createAsyncFunction(wrapper));

    wrapper = (id) => this.workspace.highlightBlock(id);
    
    interpreter.setProperty(scope, 'highlightBlock',
        interpreter.createNativeFunction(wrapper));
  }

  update() {
    const dataCubeXY = this.dataCube.getData('xy')
    
    if (dataCubeXY && !this.carrying && this.dropPoint.every((val, axis) => val === dataCubeXY[axis])) {
      this.onComplete()
    }
  }
}

let config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  pixelArt: true,
  scene: SecondScene,
  parent: "game-canvas"
};

new Game(config);
