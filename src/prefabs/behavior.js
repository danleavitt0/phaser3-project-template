export const ForeverLooper = superclass => class extends superclass {
  addBlocklyBlocks () {
    const additional = super.addBlocklyBlocks ? super.addBlocklyBlocks() : ''
    return `${additional}
    <block type="forever"></block>`
  }
}

export const ForwardTurnMixin = superclass => class extends superclass {
  addBlocklyBlocks () {
    const additional = super.addBlocklyBlocks ? super.addBlocklyBlocks() : ''
    return `${additional}
    <block type="forward"></block>
    <block type="turnRight"></block>
    <block type="turnLeft"></block>`
  }
  forward (n = 1) {
    return Promise.all(this.bots.map(bot => {
      const botPosition = [bot.gridPosition.x, bot.gridPosition.y]
      const heading = this.getHeadingVector(bot.rotation)
      return bot.animatedGridMove(...vadd(botPosition, vmul(Number(n), heading)))
    }))
  }
  turnRight () {
    return Promise.all(this.bots.map(bot => 
      bot.animatedTurn(Math.PI / 2)
    ))
  }
  turnLeft() {
    return Promise.all(this.bots.map(bot => 
      bot.animatedTurn(-Math.PI / 2)
    ))
  }
  getHeadingVector (radians) {
    return [Math.round(Math.sin(radians)), -1 * Math.round(Math.cos(radians))]
  }
  initApi (interpreter, scope) {
    if (super.initApi) {
      super.initApi(interpreter, scope)
    }
    interpreter.setProperty(scope, 'forward',
      interpreter.createAsyncFunction(this.botMove(this.forward)));

    interpreter.setProperty(scope, 'turnRight',
      interpreter.createAsyncFunction(this.botMove(this.turnRight)));

    interpreter.setProperty(scope, 'turnLeft',
      interpreter.createAsyncFunction(this.botMove(this.turnLeft)));
  }
}

export const DirectionMoverMixin = superclass => class extends superclass {
  addBlocklyBlocks () {
    const additional = super.addBlocklyBlocks ? super.addBlocklyBlocks() : ''
    return `${additional}
    <block type="up"></block>
    <block type="down"></block>
    <block type="left"></block>
    <block type="right"></block>`
  }

  up (n = 1) {
    const sorted = this.bots.slice().sort((a, b) => a.y - b.y)
    return Promise.all(sorted.map(bot => {
      return bot.animatedGridMove(bot.gridPosition.x, bot.gridPosition.y - 1)
    }))
  }

  down (n = 1) {
    const sorted = this.bots.slice().sort((a, b) => b.y - a.y)
    return Promise.all(sorted.map(bot => 
      bot.animatedGridMove(bot.gridPosition.x, bot.gridPosition.y + 1)
    ))
  }

  right (n = 1) {
    const sorted = this.bots.slice().sort((a, b) => a.x - b.b)
    return Promise.all(sorted.map(bot => 
      bot.animatedGridMove(bot.gridPosition.x + 1, bot.gridPosition.y)
    ))
  }

  left (n = 1) {
    const sorted = this.bots.slice().sort((a, b) => b.x - a.x)
    return Promise.all(sorted.map(bot => 
      bot.animatedGridMove(bot.gridPosition.x - 1, bot.gridPosition.y)
    ))
  }

  initApi (interpreter, scope) {
    if (super.initApi) {
      super.initApi(interpreter, scope)
    }
    interpreter.setProperty(scope, 'up',
      interpreter.createAsyncFunction(this.botMove(this.up)));

    interpreter.setProperty(scope, 'right',
      interpreter.createAsyncFunction(this.botMove(this.right)));

    interpreter.setProperty(scope, 'down',
      interpreter.createAsyncFunction(this.botMove(this.down)));

    interpreter.setProperty(scope, 'left',
      interpreter.createAsyncFunction(this.botMove(this.left)));
  }
}

function vadd (x, y) {
  if (x.length !== y.length) {
    throw new Error('Cannot add vectors of different lengths')
  }
  return x.map((a, i) => Number(a) + Number(y[i]))
}

function vmul (a, x) {
  return x.map(b => Number(b) * Number(a))
}