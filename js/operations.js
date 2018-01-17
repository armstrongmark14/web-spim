var operations = {
/*
 *****************************************************************************
 * ARITHMETIC OPERATIONS
 *****************************************************************************
*/
    // Addition with overflow
    add: {
        operation: function(op) {
            reg[op[1]] = reg.getV(op[2]) + reg.getV(op[3]);
            if (reg[op[1]] < -2147483648 || reg[op[1]] > 2147483647) {
                error.overflow(parser.getCurrentLine());
            }
        },
        readInstruction: function(line) {
            return regex.rType('add', line);
        },
        returnValue: 1
    },

    // Addition without overflow
    addu: {
        operation: function(op) {
            reg[op[1]] = reg.getV(op[2]) + reg.getV(op[3]);
        },
        readInstruction: function(line) {
            return regex.rType('addu', line);
        },
        returnValue: 1
    },

    // add immediate operation with overflow
    addi: {
        operation: function(op) {
            reg[op[1]] = reg.getV(op[2]) + op[3];
            if (reg[op[1]] < -2147483648 || reg[op[1]] > 2147483647) {
                error.overflow(parser.getCurrentLine());
            }
        },
        readInstruction: function(line) {
            return regex.iType('addi', line);
        },
        returnValue: 1
    },

    // Add Immediate without overflow
    addiu: {
        operation: function(op) {
            reg[op[1]] = reg.getV(op[2]) + op[3];
        },
        readInstruction: function(line) {
            return regex.iType('addiu', line);
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

    // Absolute Value
    abs: {
        operation: function(op) {
            reg[op[1]] = Math.abs(reg.getV(op[2]));
        },
        readInstruction: function(line) {
            return regex.twoRegOnly('abs', line);
        },
        returnValue: 1
    },
/*
 *****************************************************************************
 * COMPARISON OPERATIONS
 *****************************************************************************
*/

    // AND operation between two registers
    and: {
        operation: function(op) {
            reg[op[1]] = reg.getV(op[2]) & reg.getV(op[3]);
        },
        readInstruction: function(line) {
            return regex.rType('and', line);
        },
        returnValue: 1
    },

    // And a register with an immediate value
    andi: {
        operation: function(op) {
            reg[op[1]] = reg.getV(op[2]) & op[3];
        },
        readInstruction: function(line) {
            return regex.iType('andi', line);
        },
        returnValue: 1
    },

    // Logical NOR operation
    nor: {
        operation: function(op) {
            var num = reg.binary(op[2]);
            var num2 = reg.binary(op[3]);
            var result = '';
            for (var i = 0; i < 32; i++) {
                if (num.charAt(i) === '0' && num2.charAt(i) === '0') {
                    result += '1';
                }
                else { result += '0'; }
            }
            reg[op[1]] = parseInt(result, 2);
        },
        readInstruction: function(line) {
            return regex.rType('nor', line);
        },
        returnValue: 1
    },

    // Logical OR operation
    or: {
        operation: function(op) {
            var num = reg.binary(op[2]);
            var num2 = reg.binary(op[3]);
            var result = '';
            for (var i = 0; i < 32; i++) {
                if (num.charAt(i) === '1' && num2.charAt(i) === '1') {
                    result += '1';
                }
                else { result += '0'; }
            }
            reg[op[1]] = parseInt(result, 2);
        },
        readInstruction: function(line) {
            return regex.rType('or', line);
        },
        returnValue: 1
    },
    
    // Count leading ONES
    clo: {
        operation: function(op) {
            var num = reg.binary(op[2]);
            var i;
            for (i = 0; i < 32; i++) {
                if (num.charAt(i) === '0') {
                    break;
                }
            }
            reg[op[1]] = i;
        },
        readInstruction: function(line) {
            return regex.twoRegOnly('clo', line);
        },
        returnValue: 1
    },
    
    // Count leading ZEROES
    clz: {
        operation: function(op) {
            var num = reg.binary(op[2]);
            console.log(num);
            var i;
            for (i = 0; i < 32; i++) {
                if (num.charAt(i) === '1') {
                    break;
                }
            }
            reg[op[1]] = i;
        },
        readInstruction: function(line) {
            return regex.twoRegOnly('clz', line);
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
