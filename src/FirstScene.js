import Phaser, { Scene, Game } from "phaser";
import IsoPlugin from "phaser3-plugin-isometric";
import isoBlocksImg from "./assets/atlas/isoblocks.png";
import isoJson from "./assets/atlas/isoblocks.json";
import cubeImg from "./assets/cube.png";
import tileImg from "./assets/tile.png";
import workspace, {codeBuilder} from './blocklySetup1'
import Interpreter from 'js-interpreter'

const levelLayout = [
  [1, 1, 1, 2, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1]
];

const SPEED = 500

export class FirstScene extends Scene {
  constructor() {
    super({
      key: "IsoProjectionExample",
      mapAdd: { isoPlugin: "iso" }
    });
    this.size = levelLayout.length - 1
    this.characterX = 0;
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
    this.load.atlas("isoblocks", isoBlocksImg, isoJson);
    this.load.image("cube", cubeImg);
    this.load.image("tile", tileImg);
    this.load.scenePlugin({
      key: "IsoPlugin",
      url: IsoPlugin,
      sceneKey: "iso"
    });
  }

  up (n = 1) {
    if (this.characterY - 1 < 0) {
      this.characterY = 0
    } else {
      this.characterY -= 1;
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

  reset () {
    this.running = false;
    this.scene.start()
    this.characterX = 0
    this.characterY = 4
    this.characterSprite.isoX = 0
    this.characterSprite.isoY = 4
    this.characterSprite.isoZ = 0
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
    this.characterX = 0;
    this.characterY = 4;
    this.running = true;
    const code = codeBuilder()
    console.log(code)
    this.interpreter = new Interpreter(code, this.initApi.bind(this));
    this.nextStep();
  }

  stop () {
    this.running = false
  }

  create() {
    // Set the origin of the isometric projection to the mid top of the screen

    this.isoGroup = this.add.group();
    this.iso.projector.origin.setTo(0.5, 0.2);
    this.startButton = this.add.circle(150, 0, 50, 0x303300, 1).setInteractive()
    this.add.text(136, -7, 'Run')
    this.startButton.on('pointerdown', () => this.run())

    this.stopButton = this.add.circle(250, 0, 50, 0x330000, 1).setInteractive()
    this.add.text(230, -7, 'Stop')
    this.stopButton.on('pointerdown', () => this.stop())

    // Even though the children are added back to front, it is sorted the right way
    // because depth value is set on the IsoSprites and Phaser 3 sorts after that by default.

    // Create a cube using the new isoSprite factory method at the specified position.
    this.spawnTiles();
    this.characterSprite = this.add.isoSprite(
      this.characterX * 38,
      this.characterY * 38,
      10,
      "cube"
    );

    this.characterSprite.depth = 1
    // this.cameras.main.zoom = 1;
    this.cameras.main.scrollY = -110;
    // Add a tween so we can see the depth sorting works on updates
  }

  renderCharacter() {
    // this.characterSprite.isoX = this.characterX * 38;
    // this.characterSprite.isoY = this.characterY * 38;
    const maybeDoMoreThings = () => {
      const characterLocationValue = levelLayout[this.characterY][this.characterX]
      if (characterLocationValue === 0) {
        return this.tweens.add({
          targets: this.characterSprite,
          isoZ: -500,
          duration: 2000,
          scaleX: 0,
          scaleY: 0,
          // easeParams: [3.5],
          ease: 'Quad',
          onComplete: () => this.lost(),
          repeat: 0
        })
      } else if (characterLocationValue === 2) {
        return this.onComplete()
      }       
    }
    this.tweens.add({
      targets: this.characterSprite,
      isoX: this.characterX * 38,
      isoY: this.characterY * 38,
      duration: SPEED - 200,
      onComplete: maybeDoMoreThings
    })

  }

  spawnTiles() {
    levelLayout.forEach((row, y) => {
      row.forEach((column, x) => {
        var tile = this.add.isoSprite(
          x * 38,
          y * 38,
          0,
          "tile",
          this.isoGroup
          // "block-058"
        );
        tile.setData("row", x);
        tile.setData("col", y);
        tile.depth = -1;

        tile.setInteractive();

        if (!column) {
          tile.destroy();
        } else if (column === 2) {
          tile.setTint(0xF4F396)
        } else {
          tile.on("pointerover", function() {
            this.setTint(0x86bfda);
            this.isoZ += 5;
          });

          tile.on("pointerout", function() {
            this.clearTint();
            this.isoZ -= 5;
          });
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

    wrapper = (id) => this.workspace.highlightBlock(id);
    
    interpreter.setProperty(scope, 'highlightBlock',
        interpreter.createNativeFunction(wrapper));
  }

  update() {
    
  }
}

let config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  pixelArt: true,
  scene: FirstScene,
  parent: "game-canvas"
};

new Game(config);
