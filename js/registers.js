var reg = {
    // returns a string representation of register in decimal
    decimal: function(register) {
        return this[register];
    },
    // returns a string representation of register in Hex
    hex: function(register) {
        var value = parseInt(this[register], 10).toString(16);
        var pad = '0';
        var padding = '';

        if (this[register] < 0) {
            value = (this[register] >>> 0).toString(16);
        }

        for (var i = 0; i < 8 - value.length; i++) {
            padding += pad;
        }
        return "0x" + (padding + value).toUpperCase();
    },

    // returns a string representation of register in Binary
    binary: function(register) {
        return this.decimalToBinary(this[register]);
    },

    // This will update the register table of a specific register
    update: function(register) {
        document.getElementById(register + "-decimal").innerHTML = reg.decimal(register);
        document.getElementById(register + "-hex").innerHTML = reg.hex(register);
        document.getElementById(register + "-binary").innerHTML = reg.binary(register);
    },

    // Loops through all the registers and updates them
    updateAll: function() {
        for (var i = 0; i < 10; i++) {
            if (i < 2) {
                this.update("$v" + i);
            }
            if (i < 4) {
                this.update("$a" + i);
            }
            if (i < 8) {
                this.update("$s" + i);
            }
            this.update("$t" + i);
        }
    },

    // This function will update all the registers with values from the inputs
    loadValues: function() {
        for (var property in this) {
            if (this.hasOwnProperty(property)
                && document.getElementById(property + "-input") != null) {

                if (document.getElementById(property + "-input").value) {
                    this[property] = document.getElementById(property + "-input").value;
                }
            }
        }
    },

    // This function will reset all the "Initial Value" inputs to 0
    resetInitialValues: function() {
        for (var property in this) {
            if (this.hasOwnProperty(property)
                && document.getElementById(property + "-input") != null) {

                document.getElementById(property + "-input").value = 0;
            }
        }
    },

    // Function for getting a desimal value of a register
    getV: function(regName) {
        return parseInt(this[regName]);
    },

    // This function moves values from right side to inputs
    setValues: function() {
        for (var property in this) {
            if (this.hasOwnProperty(property)
                && document.getElementById(property + "-input") != null) {

                var v = document.getElementById(property + '-decimal').innerHTML;
                document.getElementById(property + "-input").value = v;
            }
        }
    },

    // This function takes a decimal num and converts it to 32-bit padded binary
    // string representation
    decimalToBinary: function(num) {
        var value = num.toString(2);
        var pad = '0';
        var padding = '';
        // If number is negative, set pad to negative and get 2's comp
        if (num < 0) {
            value = (num >>> 0).toString(2);
            pad = '1';
        }
        
        for (var i = 0; i < 32 - value.length; i++) {
            padding += pad;
        }
        return padding + value;
    },
    
    // THIS REGISTER MUST ALWAYS BE 0
    // Below has a function to make it un-writable
    $0: 0,

    // Temporary Registers
    $t0: 0,
    $t1: 0,
    $t2: 0,
    $t3: 0,
    $t4: 0, 
    $t5: 0, 
    $t6: 0, 
    $t7: 0, 
    $t8: 0, 
    $t9: 0, 

    // Result and parameter registers
    $v0: 0,
    $v1: 0,
    $a0: 0,
    $a1: 0,
    $a2: 0,
    $a3: 0,

    // Saved registers
    $s0: 0,
    $s1: 0,
    $s2: 0,
    $s3: 0,
    $s4: 0,
    $s5: 0,
    $s6: 0,
    $s7: 0,

    // Return address register and stack pointer
    $ra: 0,
    $sp: 0,
};

// Making sure that nobody can overwrite the $0 register
Object.defineProperty(reg, "$0", {
    value: 0,
    writable: false,
    enumerable: true,
    configurable: true
});

