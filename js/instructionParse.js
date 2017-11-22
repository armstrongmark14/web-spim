var instructionParse = {
    run: function() {
        parser.readCode();
        var pipeline = false;
        for (var i = 0; i < parser.lines; i++) {

            // Parsing the current line
            var line = parser.parseLine();
            var result = instructionParse.read(line);

            // Doing this right after the instruction is read so we go around
            // again if we break for the load/branch/jump delay slot :)
            if (pipeline) {
                break;
            }

            // Reading the line and performing action
            if (result == null) {
                console.log("PROGRAM EXIT:\n" + line);
                pipeline = true;
            }
        }

        // Have to do stuff here to deal with branches/jumps
        // NEED A WAY TO RESTART RUNNING THE PROGRAM AT A SPECIFIC LINE!!!!

        reg.updateAll();        
        console.log("******************************");
    },

    // Getting the register and immediate values from i-type instructions
    iType: function(line) {
        var reg1 = line[1].replace(/,/g, '');
        var reg2 = line[2].replace(/,/g, '');
        var reg3 = line[3];
        return [reg1, reg2, reg3];
    },
    operandFormat: function(regArray) {
        var left = parseInt(reg[regArray[0]]);
        var right = parseInt(reg[regArray[1]]);
        // If the right operand is an immediate, use this
        var rightImmediate = parseInt(regArray[1]);

        return [left, right, rightImmediate];
    },

    // This will read each line and send the line to the correct function
    // that will execute it
    read: function(line) {
        if (line === null) { return; }

        // console.log(line);

        // This portion will perform operations on comments, procedure headings
        if (line[0].charAt(0) === '#') {
            // This line is a comment
            // console.log("COMMENT LINE");
        }
        // If it is a procedure declaration
        else if (line[0].charAt(line[0].length - 1) === ':') {
            // console.log("PROCEDURE DEFINITION");
            if (line[0] === 'programExit:') {
                return null;
            }
        }
        else {
            // Getting the registers & an array of possible operands
            var registers = this.iType(line);
            var operands = this.operandFormat([registers[1], registers[2]]);

            // This will perform the operation given the operation exists
            // by using the correct operation object's .operation()
            var instruction = window[line[0]];
            instruction.operation(registers[0], operands);
        }

        return 1;
        
    }
};
