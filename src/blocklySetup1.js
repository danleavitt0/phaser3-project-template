import * as Blockly from "blockly"
Blockly.JavaScript.addReservedWords('code');
Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');

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
  }
};



const workspace = Blockly.inject("blockly", {
  media: "../build/media",
  toolbox: document.getElementById("toolbox")
});

const codeBuilder = () => Blockly.JavaScript.workspaceToCode(workspace)


export default workspace
export {
  codeBuilder
}
