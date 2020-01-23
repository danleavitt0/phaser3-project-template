// import {DirectionMoverMixin, ForeverLooper} from '../prefabs/behavior'
import workspace, { codeBuilder } from '../blocklySetup1';
import spriteHole from '../assets/sprite_hole.png'
import tileImg1 from '../assets/sprite_0.png'
import tileImg2 from '../assets/sprite_1.png'
import SwitchPlate from "../prefabs/Switch"
import isoCubeImg from '../assets/cube.png'
import cubeImg from "../assets/cube2.png"
import Interpreter from 'js-interpreter'
import Bot from "../prefabs/Bot"
import Box from "../prefabs/Box"
import Phaser, { Scene } from "phaser"
import Blockly from 'blockly'


export default class PuzzleEngine extends Scene {
  constructor({key}) {
    super({key})
    this.world = {gridSize: {x: 50, y: 50}}
    this.workspace = workspace
    this.running = false;
    this.steps = 0
    this.switchNumber = 1
    this.speed = 200
  }

  updateSwitchPlates () {
    this.switches.getChildren().forEach((switchPlate) => switchPlate.update())
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
    this.load.image("hole", spriteHole)
    this.load.image("isoCube", isoCubeImg)
  }

  create() {
    // Set the origin of the isometric projection to the mid top of the screen
    this.onCreate()
    this.switchNumber = 1
    this.switches = this.add.group()
    this.tileGroup = this.add.group();
    this.boxes = this.add.group()
    this.startButton = this.add.circle(-100, -100, 50, 0x303300, 1).setInteractive()
    this.add.text(-115, -107, 'Run')
    this.startButton.on('pointerdown', () => this.run())

    this.stopButton = this.add.circle(10, -100, 50, 0x330000, 1).setInteractive()
    this.add.text(-7, -107, 'Stop')
    this.stopButton.on('pointerdown', () => this.stop())
    // this.characterSpriteGroup = this.add.group()
    // Even though the children are added back to front, it is sorted the right way
    // because depth value is set on the IsoSprites and Phaser 3 sorts after that by default.
    this.bots = this.botStartingSpots.map(([x, y, rot]) => 
      new Bot({scene: this, gridX: x, gridY: y, facing: rot})
    )
    
    this.spawnTiles();
    this.setBlocked()
    this.spawnSwitches()
    this.spawnBoxes()

    // this.characterSprite = this.add.sprite(
    //   this.characterX * 50,
    //   (this.characterY * 50) - 3,
    //   "cube"
    // )
    // this.characterSpriteGroup.add(this.heroBot)

    // this.cameras.main.zoom = 1;
    this.cameras.main.scrollY = -200;
    this.cameras.main.scrollX = -200;
    // Add a tween so we can see the depth sorting works on updates
  }

  reset () {
    this.steps = 0
    this.running = false;
    this.scene.start()
  }

  lost () {
    this.scene.pause()
    this.running = false;
    alert('you lost')
    this.reset()
  }

  complete () {
    this.running = false;
    alert('done')
    this.workspace.clear()
    this.onComplete()
  }

  run () {
    this.steps = 0
    this.scene.start()
    this.running = true;
    const code = codeBuilder()
    this.interpreter = new Interpreter(code, this.initApi.bind(this));
    this.nextStep();
  }

  stop () {
    this.running = false
  }

  spawnTiles() {
    this.levelLayout.forEach((row, y) => {
      row.forEach((column, x) => {

        var tile = this.add.sprite(
          x * this.world.gridSize.x,
          y * this.world.gridSize.y,
          (x + y) % 2 === 0 ? "tile1" : "tile2",
          // "block-058"
        );
        this.tileGroup.add(tile)
        tile.setData('bodyType', 'tile')
        tile.setData("gridX", x);
        tile.setData("gridY", y);
        // tile.immovable = true
        // tile.depth = -1;
        
        tile.setInteractive();
        const type = typeof column === 'number' ? column : column.type
        if (!type) {
          tile.destroy();
        } else if (type === 2) {
          this.completionBlock = {x, y}
          tile.setTint(0x70C060)
        }
        // tile.setDepth(centerY + rowNum + columnNum);
      });
    });
  }

  spawnBoxes () {
    this.boxStartingSpots.map(({location}) => this.boxes.add(new Box({scene: this, gridX: location[0], gridY: location[1]})))
  }

  setBlocked () {
    this.blockedTiles = this.blockedSpots.reduce((acc, location) => {
      const tile = this.tileGroup.getChildren().find((tile) => 
        location[0] === tile.getData('gridX') && location[1] === tile.getData('gridY')
      )
      tile.setScale(0.5)
      tile.setData('blocked', true)
      tile.activate = () => {
        return new Promise((resolve) => {
          tile.setData('blocked', false)
          this.tweens.add({targets: tile, scale: 1, duration: this.speed, onComplete: resolve})
        })
      }
      tile.deactivate = () => {
        return new Promise((resolve) => {
          tile.setData('blocked', true)
          this.tweens.add({targets: tile, scale: 0.5, duration: this.speed, onComplete: resolve})
        })
      }
      return {
        ...acc,
        [location.join(',')]: tile
      }
    }, [])
  }

  spawnSwitches () {
    this.switches.addMultiple(
      this.switchSpots.map(({location, target, countdown}) => {
        const tile = this.blockedTiles[target.join(',')]
        if (tile) {
          const text1 = this.add.text(
            Math.floor(tile.x + tile.width / 8),
            Math.floor(tile.y + tile.height / 8),
            '' + this.switchNumber,
            {color: '#333'}
          )
          text1.setDepth(1).setOrigin(1)
          return new SwitchPlate({scene: this, gridX: location[0], gridY: location[1]}, tile, countdown)
        } else return null
      })
    )
  }

  botMove (fn) {
    return (...args) => {
      const callback = args.pop()
      return fn.call(this, ...args)
        .then(this.updateSwitchPlates.bind(this))
        .then(this.checkForCompletion.bind(this))
        .then(callback)
        .catch((error) => {
          console.error(error)
          callback()
        })
    }
  }

  initApi (interpreter, scope) {
    let wrapper = (id) => this.workspace.highlightBlock(id);
    
    interpreter.setProperty(scope, 'highlightBlock',
        interpreter.createNativeFunction(wrapper));
  }

  checkForCompletion () {
    if (this.bots.some(bot => bot.gridPosition.x === this.completionBlock.x && bot.gridPosition.y === this.completionBlock.y)) {
      this.complete()
    }
  }
}

