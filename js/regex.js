var regex = {
    // These are the pieces of RegExp used for getting instruction parts
    leadingSpace: "\^\\s*?",
    register: "\\s+(\\$v[0-1]|\\$a[0-3]|\\$[st][0-9]|\\$0)",
    comment: "(?:\\s+?#?.*?)?\$",
    comma: ",?",
    immediate: "\\s+(-?\\d+|0x[a-fA-F0-9]+)", // TO DO
    procedure: "\\s+(\\w+)", // TO DO

    // Regex for r-type instructions. These have 3 registers used
    rType: function(instruction, line) {
        var l = this.leadingSpace;
        var r = this.register;
        var c = this.comma;
        var comment = this.comment;
        var reg = new RegExp(l + instruction + r + c + r + c + r + comment);
        return reg.exec(line);
    },
    
    // Regex for i-type instructions. These have 2 registers and immediate
    iType: function(instruction, line) {
        var l = this.leadingSpace;
        var r = this.register;
        var i = this.immediate;
        var c = this.comma;
        var comment = this.comment;
        var reg = new RegExp(l + instruction + r + c + r + c + i + comment);
        var result = reg.exec(line);
        result[3] = this.convertToInteger(result[3]);
        return result;
    },

    // Regex for a simple jump
    simpleJump: function(instruction, line) {
        var l = this.leadingSpace;
        var p = this.procedure;
        var comment = this.comment;
        var reg = new RegExp(l + instruction + p + comment);
        return reg.exec(line);
    },

    // Regex for branches with a single register and then a procedure
    branchOneReg: function(instruction, line) {
        var l = this.leadingSpace;
        var r = this.register;
        var p = this.procedure;
        var c = this.comma;
        var comment = this.comment;
        var reg = new RegExp(l + instruction + r + c + p + comment);
        var result = reg.exec(line);
        return result;
    },

    // Regex for branches with 2 register values and a procedure name
    branchTwoReg: function(instruction, line) {
        var l = this.leadingSpace;
        var r = this.register;
        var p = this.procedure;
        var c = this.comma;
        var comment = this.comment;
        var reg = new RegExp(l + instruction + r + c + r + c + p + comment);
        var result = reg.exec(line);
        return result;
    },

    // Regex for an instruction with only 2 registers
    twoRegOnly: function(instruction, line) {
        var l = this.leadingSpace;
        var r = this.register;
        var c = this.comma;
        var comment = this.comment;
        var reg = new RegExp(l + instruction + r + c + r + comment);
        var result = reg.exec(line);
        return result;
    },
    
    // Regex for instruction with one register and an immediate
    oneRegOneImmediate: function(instruction, line) {
        var l = this.leadingSpace;
        var r = this.register;
        var i = this.immediate;
        var c = this.comma;
        var comment = this.comment;
        var reg = new RegExp(l + instruction + r + c + i + comment);
        var result = reg.exec(line);
        result[2] = this.convertToInteger(result[2]);
        return result;
    },

    // This function gets the operation code for the instruction
    getOperationCode: function(line) {
        var reg = new RegExp("\\w+");
        var proc = reg.exec(line);
        return proc[0];
    },

    // These two function check for procedures and get the names of them
    isProcedure: function(line) {
        var reg = new RegExp(this.leadingSpace + ".+:");
        return reg.test(line);
    },
    getProcedureName: function(line) {
        var reg = new RegExp("(\\w+):");
        var proc = reg.exec(line);
        return proc[1];
    },


    isCommentLine: function(line) {
        var reg = new RegExp("\^\\s*#.*$");
        return reg.test(line);
    },

    // Testing if this line is a comment
    isEmptyLine: function(line) {
        var reg = new RegExp("\^\\s*$");
        return reg.test(line);
    },

    // Converting the string immediate to an integer
    convertToInteger: function(str) {
        var v = parseInt(str);

        if (str.substr(0, 2) === '0x') {
            if (v >= 32768) {
                v = v - 0x10000;
            }
        }
        
        // Checking to see if it's within the 16-bit int range
        if (v > 32767 || v < -32768) {
            throw new Error('Immediate value out of range. Line: ' + parser.getCurrentLine());
        }
        return v;
    }

};
