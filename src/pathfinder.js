export default (current, target, tiles) => {
  const open = tiles.map(tile => {
    return {...tile}
  })
  const closed = []

}

function getNeighbors (current, tiles) {
  const currentX = current.getData('gridX')
  const currentY = current.getData('gridY')
  const right = [currentX + 1, currentY].join(',')
  const left = [currentX - 1, currentY].join(',')
  const up = [currentX, currentY - 1].join(',')
  const down = [currentX, currentY + 1].join(',')
  return tiles.filter(tile => {
    const location = [tile.getData('gridX'), tile.getData('gridY')].join(',')
    return 

  })
}