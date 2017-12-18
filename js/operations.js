var add = {
    operation: function(op) {
        reg[op[1]] = reg.getV(op[2]) + reg.getV(op[3]);
    },
    readInstruction: function(line) {
        return regex.rType('add', line);
    },
    returnValue: 1
};

var addi = {
    operation: function(op) {
        reg[op[1]] = reg.getV(op[2]) + op[3];
    },
    readInstruction: function(line) {
        return regex.iType('addi', line);
    },
    returnValue: 1
};

var sub = {
    operation: function(op) {
        reg[op[1]] = reg.getV(op[2]) - reg.getV(op[3]);
    },
    readInstruction: function(line) {
        return regex.rType('sub', line);
    },
    returnValue: 1
};

var sll = {
    operation: function(op) {
        reg[op[1]] = reg.getV(op[2]) << op[3];
    },
    readInstruction: function(line) {
        return regex.iType('sll', line);
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

