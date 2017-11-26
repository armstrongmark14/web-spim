var instructionParse = {
    reset: function() {
        this.jumpLocation = 0;
        this.infiniteLoopCheck = 0;
    },
    run: function() {

        // Resetting the instructionParse object so that we don't mistakenly
        // use values from the last run
        this.reset();
        // Reading the code from the textarea into the parser
        parser.readCode();

        var jump = false;
        var jumpAndLink = false;
        var line;
        var result;

        console.clear();

        for (var i = 0; i < parser.lines; i++) {

            // Parsing the current line
            line = parser.parseLine();
            console.log(line);

            result = instructionParse.read(line);
            
            // Doing this right after the instruction is read so we go around
            // again if we break for the load/branch/jump delay slot :)
            if (jump) {
                if (jumpAndLink) {

                }
                // Have to update cursor location, change loop variable
                parser.jumpTo(this.jumpLocation);
                i = this.jumpLocation;
                this.jumpLocation = null;
                jump = false;

                // Checking for infinite loop because you know it'll happen :P
                this.infiniteLoopCheck += 1;
                if (this.infiniteLoopCheck > 5000) {
                    var m="You have an infinite loop.\nI stopped it.";
                    alert(m);
                    break;
                }
            }

            // Setting it up to go into the jump functionality next loop around
            if (result === 'j') {
                jump = true;
            }
            
            // Reading the line and performing action
            if (result === null) {
                console.log("PROGRAM EXIT:\n" + line);
                break;    // Have to break to exit here, no delay :)
            }
        }

        // Since the code has finished running, we update registers and output
        reg.updateAll();        
        console.log("******************************");
        console.log("EXECUTION FINISHED");
    },

    // Getting the register and immediate values from i-type instructions
    iType: function(line) {
        var reg1 = line[1].replace(/,/g, '');
        var reg2, reg3;
        if (line.length > 2) {
            reg2 = line[2].replace(/,/g, '');
            reg3 = line[3];
        }
        return [reg1, reg2, reg3];
    },
    operandFormat: function(regArray) {
        var left;
        var right;
        var rightImmediate;
        var rightLocation;
        var farRightLocation;
        left = parseInt(reg[regArray[0]]);
        if (regArray.length > 1) {
            right = parseInt(reg[regArray[1]]);
            // If the right operand is an immediate, use this
            rightImmediate = parseInt(regArray[1]);
            // If it's a branch with single register, this will have location
            rightLocation = regArray[0];
            farRightLocation = regArray[1];
        }

        return [left, right, rightImmediate, rightLocation, farRightLocation];
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
                return 'exit';
            }
        }
        else {

            // Checking for the correct comma's in the line
            this.commaCheck(line);

            // Getting the registers & an array of possible operands
            var registers = this.iType(line);
            var operands = this.operandFormat([registers[1], registers[2]]);

            // This will perform the operation given the operation exists
            // by using the correct operation object's .operation()
            var instruction = window[line[0]];
            instruction.operation(registers[0], operands);

            return instruction.returnValue;
        }

        return 1;
        
    },

    // Function that will check the line for correct comma placement
    commaCheck: function(line) {
        if (line.length >= 3) {
            
            // Joining the space-split line, then splitting on commas
            var split = line.join("").split(',');
            
            // Could probably simplify this, but it's readable this way
            if (line.length > split.length + 1) {
                this.commaError();
            }
        }
    },
    commaError: function() {
        alert("Missing comma:\n\nLine: " + (parser.currentLine - 1));
        throw new Error("Missing a comma");
    },
    
    // These store the line of the code to jump to, and the amount of jumps
    jumpLocation: 0,
    infiniteLoopCheck: 0
};
