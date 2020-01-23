import { DirectionMoverMixin, ForeverLooper } from "../prefabs/behavior";
import PuzzleScene from "../prefabs/PuzzleScene";
import compose from "lodash/fp/compose"

const mixins = compose(ForeverLooper, DirectionMoverMixin)

const levelLayout = [
  [0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 2],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
];

const botStartingSpots = [[0, 3]]

const boxes = [
  {location: [0, 2]},
  {location: [2, 2]},
  {location: [4, 2]}
]

const blocked = [
  [1, 3],
  [3, 3],
  [5, 3]
]

const switches = [
  {location: [0, 1], countdown: 1, target: [1, 3]},
  {location: [2, 1], countdown: 1, target: [3, 3]},
  {location: [4, 1], countdown: 1, target: [5, 3]}
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