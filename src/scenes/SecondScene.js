import { DirectionMoverMixin, ForeverLooper } from "../prefabs/behavior";
import PuzzleScene from "../prefabs/PuzzleScene";
import compose from "lodash/fp/compose"

const mixins = compose(ForeverLooper, DirectionMoverMixin)

const levelLayout = [
  [0, 2, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0]
];

const boxes = [{location: [1, 3]}]

const blocked = [
  [1, 0],
  [2, 2]
]

const switches = [
  {location: [0, 1], countdown: 1, target: [1, 0]},
  {location: [2, 3], countdown: 2, target: [2, 2]}
]

const botStartingSpots = [[1, 5]]

export default PuzzleScene({
  key: 'step6',
  mixins,
  levelLayout,
  botStartingSpots,
  boxes,
  blocked,
  switches
})

