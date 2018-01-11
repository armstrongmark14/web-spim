var operations = {
/*
 *****************************************************************************
 * ARITHMETIC OPERATIONS
 *****************************************************************************
*/
    add: {
        operation: function(op) {
            reg[op[1]] = reg.getV(op[2]) + reg.getV(op[3]);
        },
        readInstruction: function(line) {
            return regex.rType('add', line);
        },
        returnValue: 1
    },

    // add immediate operation
    addi: {
        operation: function(op) {
            reg[op[1]] = reg.getV(op[2]) + op[3];
        },
        readInstruction: function(line) {
            return regex.iType('addi', line);
        },
        returnValue: 1
    },

    // Subtraction operation
    sub: {
        operation: function(op) {
            reg[op[1]] = reg.getV(op[2]) - reg.getV(op[3]);
        },
        readInstruction: function(line) {
            return regex.rType('sub', line);
        },
        returnValue: 1
    },

/*
 *****************************************************************************
 * SHIFT OPERATIONS
 *****************************************************************************
*/

    // Shift Left Logical operation
    sll: {
        operation: function(op) {
            reg[op[1]] = reg.getV(op[2]) << op[3];
        },
        readInstruction: function(line) {
            return regex.iType('sll', line);
        },
        returnValue: 1
    },

    // Shift Right Logical operation
    srl: {
        operation: function(op) {
            reg[op[1]] = reg.getV(op[2]) >>> op[3];
        },
        readInstruction: function(line) {
            return regex.iType('srl', line);
        },
        returnValue: 1
    },

/*
 *****************************************************************************
 * JUMP OPERATIONS
 *****************************************************************************
*/

    // Simple Jump operation
    j: {
        operation: function(op) {
            // op[1] will hold the jump procedure name from the regex
            instructionParse.jumpLocation = parser.findProcedure(op[1]);
        },
        readInstruction: function(line) {
            return regex.simpleJump('j', line);
        },
        returnValue: 'j'
    },

/*
 *****************************************************************************
 * BRANCH OPERATIONS
 *****************************************************************************
*/

    // Branch on Equal operation
    beq: {
        operation: function(op) {
            if (reg.getV(op[1]) === reg.getV(op[2])) {
                instructionParse.jumpLocation = parser.findProcedure(op[3]);
                this.returnValue = 'j';
            }
            else {
                this.returnValue = 1;
            }
        },
        readInstruction: function(line) {
            return regex.branchTwoReg('beq', line);
        },
        returnValue: 1
    },

    // Branch on Equal to Zero operation
    beqz:{
        operation: function(op) {
            if (reg.getV(op[1]) === 0) {
                instructionParse.jumpLocation = parser.findProcedure(op[2]);
                this.returnValue = 'j';
            }
            else {
                this.returnValue = 1;
            }
        },
        readInstruction: function(line) {
            return regex.branchOneReg('beqz', line);
        },
        returnValue: 1
    },

    // Branch on Greater Than Zero operation
    bgtz:{
        operation: function(op) {
            if (reg.getV(op[1]) > 0) {
                instructionParse.jumpLocation = parser.findProcedure(op[2]);
                this.returnValue = 'j';
            }
            else {
                this.returnValue = 1;
            }
        },
        readInstruction: function(line) {
            return regex.branchOneReg('bgtz', line);
        },
        returnValue: 1
    },

    // Branch on Greater Than or Equal to Zero
    bgez:{
        operation: function(op) {
            if (reg.getV(op[1]) >= 0) {
                instructionParse.jumpLocation = parser.findProcedure(op[2]);
                this.returnValue = 'j';
            }
            else {
                this.returnValue = 1;
            }
        },
        readInstruction: function(line) {
            return regex.branchOneReg('bgez', line);
        },
        returnValue: 1
    },

    // Branch on Less than Zero operation
    bltz:{
        operation: function(op) {
            if (reg.getV(op[1]) < 0) {
                instructionParse.jumpLocation = parser.findProcedure(op[2]);
                this.returnValue = 'j';
            }
            else {
                this.returnValue = 1;
            }
        },
        readInstruction: function(line) {
            return regex.branchOneReg('bltz', line);
        },
        returnValue: 1
    },

    // Branch on Less than or Equal to Zero
    blez: {
        operation: function(op) {
            if (reg.getV(op[1]) <= 0) {
                instructionParse.jumpLocation = parser.findProcedure(op[2]);
                this.returnValue = 'j';
            }
            else {
                this.returnValue = 1;
            }
        },
        readInstruction: function(line) {
            return regex.branchOneReg('blez', line);
        },
        returnValue: 1
    },

    // Branch on Not Equal
    bne: {
        operation: function(op) {
            if (reg.getV(op[1]) != reg.getV(op[2])) {
                instructionParse.jumpLocation = parser.findProcedure(op[3]);
                this.returnValue = 'j';
            }
            else {
                this.returnValue = 1;
            }
        },
        readInstruction: function(line) {
            // this.returnValue = 1;
            return regex.branchTwoReg('bne', line);
        },
        returnValue: 1
    },
};
