import { DirectionMoverMixin } from "../prefabs/behavior";
import PuzzleScene from "../prefabs/PuzzleScene";
import compose from "lodash/fp/compose"

const mixins = compose(DirectionMoverMixin)

const levelLayout = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0]
];

const botStartingSpots = [[0, 3]]

const boxes = [{location: [3, 3]}]

const blocked = [
  [1, 4]
]

const switches = [
  {location: [4, 3], countdown: 1, target: [1, 4]}
]

export default PuzzleScene({
  key: 'FirstBox',
  mixins,
  levelLayout,
  botStartingSpots,
  boxes,
  blocked,
  switches
})