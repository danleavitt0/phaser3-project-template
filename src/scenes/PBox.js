import { DirectionMoverMixin } from "../prefabs/behavior";
import PuzzleScene from "../prefabs/PuzzleScene";
import compose from "lodash/fp/compose"

const mixins = compose(DirectionMoverMixin)

const levelLayout = [
  [0, 2, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0],
  [0, 1, 0, 1, 0, 0],
  [0, 1, 1, 1, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0]
];

const botStartingSpots = [[1, 5]]

const boxes = [{location: [1, 1]}]

const blocked = [
  [1, 0]
]

const switches = [
  {location: [0, 1], countdown: 1, target: [1, 0]}
]

export default PuzzleScene({
  key: 'PBox',
  mixins,
  levelLayout,
  botStartingSpots,
  boxes,
  blocked,
  switches
})
