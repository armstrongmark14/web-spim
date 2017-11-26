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

var beq = {
    operation: function(register, operand) {
        console.log("Branch if: " + reg[register] + " == " + operand[0]);
        if (reg[register] == operand[0]) {
            // operand[3] will have branch location for this type of op
            instructionParse.jumpLocation = parser.findProcedure(operand[4]);
            this.returnValue = 'j';
        }
        else {
            this.returnValue = 1;
        }
    },
    returnValue: null
};

var beqz = {
    operation: function(register, operand) {
        console.log("Branch if: " + reg[register] + " == 0");
        if (reg[register] == 0) {
            // operand[3] will have branch location for this type of op
            instructionParse.jumpLocation = parser.findProcedure(operand[3]);
            this.returnValue = 'j';
        }
        else {
            this.returnValue = 1;
        }
    },
    returnValue: null
};

