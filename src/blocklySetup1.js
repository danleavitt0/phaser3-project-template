import * as Blockly from "blockly"
Blockly.JavaScript.addReservedWords('code');
Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');


const workspace = Blockly.inject("blockly", {
  media: "../build/media",
  toolbox: document.getElementById("toolbox")
});

const clickHandler = (type) => () => {
  const blocks = workspace.getAllBlocks().filter(block => !block.disabled)
  const lastBlock = blocks[blocks.length - 1]
  const newBlock = workspace.newBlock(type)
  // newBlock.setParent(lastBlock)
  newBlock.initSvg()
  newBlock.render()

  var parentConnection = lastBlock.nextConnection;
  var childConnection = newBlock.previousConnection;
  parentConnection.connect(childConnection);
}


Blockly.JavaScript['start'] = function (block) {
  return ''
}

Blockly.JavaScript['forever'] = function(block) {
  const statements_loopcode = Blockly.JavaScript.statementToCode(block, 'loopCode');
  // TODO: Assemble JavaScript into code variable.
  const code = `while(true){\n${statements_loopcode}\nhighlightBlock('${block.id}');\n}`;
  return code;
};

Blockly.JavaScript['move'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction').trim();
  return `${dropdown_direction}(1);\n`
}

Blockly.JavaScript['up'] = function(block) {
  return `up(1);\n`
}


Blockly.JavaScript['down'] = function(block) {
  return `down(1);\n`
}


Blockly.JavaScript['left'] = function(block) {
  return `left(1);\n`
}


Blockly.JavaScript['right'] = function(block) {
  return `right(1);\n`
}


Blockly.JavaScript['forward'] = function(block) {
  return `forward(1);\n`
}

Blockly.JavaScript['turnRight'] = function(block) {
  return `turnRight();\n`
}

Blockly.JavaScript['turnLeft'] = function(block) {
  return `turnLeft();\n`
}

Blockly.JavaScript['pickUp'] = function(block) {
  return 'pickUp();\n'
}
Blockly.JavaScript['drop'] = function(block) {
  return 'drop();\n'
}

Blockly.Blocks['move'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("move")
        .appendField(new Blockly.FieldDropdown([["up ↑","up "], ["right →","right"], ["down ↓","down"], ["left ←","left"]]), "direction");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.pathObject.svgRoot.onclick = clickHandler('move')
  }
};

Blockly.Blocks['up'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("up")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.pathObject.svgRoot.onclick = clickHandler('up')
  }
};

Blockly.Blocks['down'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("down")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.pathObject.svgRoot.onclick = clickHandler('down')
  }
};

Blockly.Blocks['left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("left")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.pathObject.svgRoot.onclick = clickHandler('left')
  }
};

Blockly.Blocks['right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("right")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.pathObject.svgRoot.onclick = clickHandler('right')
  }
};

Blockly.Blocks['forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("forward")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.pathObject.svgRoot.onclick = clickHandler('forward')
  }
};

Blockly.Blocks['turnRight'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("turnRight")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.pathObject.svgRoot.onclick = clickHandler('turnRight')
  }
};
Blockly.Blocks['turnLeft'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("turnLeft")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    // console.log
    this.pathObject.svgRoot.onclick = clickHandler('turnLeft')
    // this.addEventListener('click', () => console.log('tacos'))
  }
};

Blockly.Blocks['pickUp'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("pickUp")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.pathObject.svgRoot.onclick = clickHandler('pickup')
  }
};
Blockly.Blocks['drop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("drop")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.pathObject.svgRoot.onclick = clickHandler('drop')
  }
};


Blockly.Blocks['forever'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("forever");
    this.appendStatementInput("loopCode")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
    this.pathObject.svgRoot.onclick = clickHandler('forever')
  }
};

Blockly.Blocks['start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('start code here')
    this.setColour(50)
    this.setNextStatement(true, null);
    this.setPreviousStatement(false)
    this.setMovable(false)
    this.setEditable(false)
    this.hat = 'cap'
  }
}




const codeBuilder = () => Blockly.JavaScript.workspaceToCode(workspace)


export default workspace
export {
  codeBuilder
}
