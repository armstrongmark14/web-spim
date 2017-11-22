var add = {
    operation: function(register, operand) {
        reg[register] = operand[0] + operand[1];
    }
};

var addi = {
    operation: function(register, operand) {
        reg[register] = operand[0] + operand[2];
    }
};

var sub = {
    operation: function(register, operand) {
        reg[register] = operand[0] - operand[1];
    }
};

var sll = {
    operation: function(register, operand) {
        reg[register] = operand[0] << operand[2];
    }
};


