import { DirectionMoverMixin, ForwardTurnMixin } from "../prefabs/behavior";
import PuzzleScene from "../prefabs/PuzzleScene";
import compose from "lodash/fp/compose"

const mixins = compose(ForwardTurnMixin)

const levelLayout = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 1, 1, 2, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
];

const botStartingSpots = [[1, 4]]

export default PuzzleScene({key: 'step1', mixins, levelLayout, botStartingSpots})