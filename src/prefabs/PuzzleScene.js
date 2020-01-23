import Blockly from 'blockly'
import PuzzleEngine from "./PuzzleEngine"

const required = ['key', 'mixins', 'levelLayout', 'botStartingSpots']

/**
 * @function PuzzleSceneFactory
 * @description create a puzzle scene from props
 * @param {Object} props - object of fields
 * @param props.key {String} - name of the scene
 * @param props.mixins {Function} - composed function with behaviors
 * @param props.levelLayout {Array} - Representation of the level in a matrix
 * @param props.botStartingSpots {Array} - Array of bot starting positions
 * @param props.boxes {Array=} Array of box starting positions
 * @param props.blocked {Array=} Array of blocked tiles
 * @param props.switches {Array=} Array of triggerable switches
 */
const PuzzleScene = (props) => {
  const missingField = required.find((requiredField) => !props[requiredField])
  if (missingField) throw new Error(`Missing key: ${missingField}`) 
  const {mixins} = props
  return class PuzzleScene extends mixins(PuzzleEngine) {
    constructor () {
      const {key, levelLayout, botStartingSpots, boxes = [], blocked = [], switches = []} = props
      super({key})
      this.levelLayout = levelLayout
      this.botStartingSpots = botStartingSpots
      this.boxStartingSpots = boxes
      this.blockedSpots = blocked
      this.switchSpots = switches
    }

    onCreate ()  {
      if (!Blockly.mainWorkspace.getBlocksByType('start').length) {
        Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), Blockly.mainWorkspace);
      }
      
      this.workspace.addChangeListener(Blockly.Events.disableOrphans)
      this.workspace.updateToolbox(
        `<xml>${super.addBlocklyBlocks(this.workspace)}</xml>`
      )
    }

    onComplete () {
      const thisIdx = this.scene.manager.scenes.findIndex(scene => scene.scene.key === this.scene.key)
      this.scene.start(this.scene.manager.getAt(thisIdx + 1))
    }

    initApi (interpreter, scope) {
      super.initApi(interpreter, scope)
    }
  }
}

export default PuzzleScene