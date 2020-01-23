import { DirectionMoverMixin } from "../prefabs/behavior";
import PuzzleScene from "../prefabs/PuzzleScene";
import compose from "lodash/fp/compose"

const mixins = compose(DirectionMoverMixin)

const levelLayout = [
  [0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0],
  [0, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 2, 0],
  [0, 0, 0, 0, 0, 0]
];

const botStartingSpots = [[1, 4]]

const boxes = [{location: [1, 2]}, {location: [4, 2]}]

const blocked = [
  [1, 2],
  [4, 4]
]

const switches = [
  {location: [1, 1], countdown: 1, target: [4, 4]},
  {location: [4, 1], countdown: 1, target: [1, 2]}
]

export default PuzzleScene({
  key: 'DoubleSwitch',
  mixins,
  levelLayout,
  botStartingSpots,
  boxes,
  blocked,
  switches
})
