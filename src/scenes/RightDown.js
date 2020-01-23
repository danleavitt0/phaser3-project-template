import { DirectionMoverMixin } from "../prefabs/behavior";
import PuzzleScene from "../prefabs/PuzzleScene";
import compose from "lodash/fp/compose"

const mixins = compose(DirectionMoverMixin)

const levelLayout = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 2, 0]
];

const botStartingSpots = [[1, 3]]

export default PuzzleScene({key: 'RightDown', mixins, levelLayout, botStartingSpots})