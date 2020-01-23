import { ForwardTurnMixin, DirectionMoverMixin, ForeverLooper } from "../prefabs/behavior";
import PuzzleScene from "../prefabs/PuzzleScene";
import compose from "lodash/fp/compose"

/**
 * @required
 * @constant mixins!
 * @description Add the mixins that are imported above (mix and match whichever you like)
 *  - ForwardTurnMixin
 *  - DirectionMoverMixin
 *  - ForeverLooper
 * separated by commas.
 * This will add all of the blocks to your toolbox and add the code interpreter
 * @example
 * ```const mixins = compose(ForeverLooper, DirectionMoverMixin)```
 * @note The order of these will determine where they show up in the toolbox. 
 * They will show up in the reverse order so in the example above this will put
 * the forever loop at the bottom
 */
const mixins = compose()

/**
 * @required
 * @constant levelLayout
 * @description This matrix represents the level
 * | Number | Description |
 * |--------|-------------|
 * | 0 | an empty space |
 * | 1 | tile (a normal space) |
 * | 2 | completion tile (the only way to win right now) |
 */
const levelLayout = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
];

/**
 * @required
 * @constant botStartingSpots
 * @description array of bot starting positions
 * Starting positions are an array in the form [x, y]
 */
const botStartingSpots = [[0, 0]]

/**
 * @optional
 * @constant boxes
 * @description array of objects as of right now the only key is location and
 * should be an array of the form [x, y]
 */
const boxes = [
  // {location: [0, 0]},
]

/**
 * @optional
 * @constant blocked
 * @description array of blocked tiles positions (these should all be tiles that are defined in levelLayout with a 1 or 2)
 * Blocked positions are an array in the form [x, y]
 */
const blocked = [
  // [0, 0]
]

/**
 * @optional
 * @constant switches
 * @description array of objects describing the switches in the level
 * location - position of the switch in the form [x, y]
 * countdown - how many bot moves the switch should stay activated for defaults to 1
 * target - the position of the blocked tile it should fix (must be in the blocked array)
 */
const switches = [
  // {location: [0, 1], countdown: 1, target: [1, 3]},
]

export default PuzzleScene({
  key: 'FirstLoop',
  mixins,
  levelLayout,
  botStartingSpots,
  boxes,
  blocked,
  switches
})