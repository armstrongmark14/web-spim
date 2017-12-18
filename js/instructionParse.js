var instructionParse = {
    reset: function() {
        this.jumpLocation = 0;
        this.infiniteLoopCounter = 0;
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

            result = instructionParse.read(line);
            
            // Doing this right after the instruction is read so we go around
            // again if we break for the load/branch/jump delay slot :)
            if (jump && result != 'comment' && result != 'procedure') {
                if (jumpAndLink) {

                }
                // Have to update cursor location, change loop variable
                parser.jumpTo(this.jumpLocation);
                i = this.jumpLocation;
                this.jumpLocation = null;
                jump = false;

                // Checking for infinite loop because you know it'll happen :P
                this.infiniteLoopCounter += 1;
                if (this.infiniteLoopCounter > settings.loopStop) {
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

    // This will read each line and send the line to the correct function
    // that will execute it
    read: function(line) {
        if (line === null) {
            // Line is null, so skip the rest
            return;
        }
        
        if (regex.isCommentLine(line)) {
            // This line is a comment so do nothing
            // We also need to return 'comment' so that we know to skip this 
            // line for jumps/branch/load delay slow purposes
            return 'comment';
        }
        else if (regex.isProcedure(line)) {
            // If it is a procedure declaration
            // console.log("Procedure: " + regex.getProcedureName(line));
            if (regex.getProcedureName(line) == 'programExit') {
                return 'exit';
            }
            return 'procedure';
        }
        else {
            // If it's none of those, we'll see if it is a correct operation
            return this.performOperation(line);
        }

        return 1;
        
    },

    // Performs the selected operation on the line
    performOperation: function(line) {
        // Checking for the correct comma's in the line
        // console.log(line);
        var operation = regex.getOperationCode(line);

        // Converting the operation into the operation object we have created
        var instruction = window[operation];
        if (instruction == undefined) {
            // If the operation object for the instruction does not exist
            throw new Error("Operation doesn't exist. Line: " + parser.getCurrentLine());
        }

        var instructionArray = instruction.readInstruction(line);
        console.log(instructionArray);
        if (instructionArray === null) {
            throw new Error("Operation syntax is incorrect. Line: " + parser.getCurrentLine());
        }
        instruction.operation(instructionArray);

        return instruction.returnValue;
    },

    
    // These store the line of the code to jump to, and the amount of jumps
    jumpLocation: 0,
    infiniteLoopCheck: 0
};
