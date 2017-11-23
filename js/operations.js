var add = {
    operation: function(register, operand) {
        reg[register] = operand[0] + operand[1];
    },
    returnValue: 1
};

var addi = {
    operation: function(register, operand) {
        reg[register] = operand[0] + operand[2];
    },
    returnValue: 1
};

var sub = {
    operation: function(register, operand) {
        reg[register] = operand[0] - operand[1];
    },
    returnValue: 1
};

var sll = {
    operation: function(register, operand) {
        reg[register] = operand[0] << operand[2];
    },
    returnValue: 1
};

var j = {
    operation: function(procedure) {
        // Sending the location we need to change to to the instructionParse
        // We add 1 to it because that's the next location after the header
        instructionParse.jumpLocation = parser.findProcedure(procedure);
    },
    returnValue: 'j'
};


