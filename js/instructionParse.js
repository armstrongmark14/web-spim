var instructionParse = {
    stepThroughStarted: false,
    jump: false,
    line: null,
    result: null,
    reset: function() {
        this.jumpLocation = 0;
        this.infiniteLoopCounter = 0;
        this.stepThroughStarted = false;
    },
    run: function() {

        // Resetting the instructionParse object so that we don't mistakenly
        // use values from the last run
        this.reset();
        // Reading the code from the textarea into the parser
        program.readCode();

        console.clear();

        for (var i = 0; i < program.lines; i++) {

            // Parsing the current line
            line = program.nextLine();

            result = instructionParse.read(line);
            
            // Doing this right after the instruction is read so we go around
            // again if we break for the load/branch/jump delay slot :)
            if (this.jump && result != 'comment' && result != 'procedure') {
                // Have to update cursor location, change loop variable
                program.jumpTo(this.jumpLocation);
                i = this.jumpLocation;
                this.jumpLocation = null;
                jump = false;

                // Checking for infinite loop because you know it'll happen :P
                this.infiniteLoopCounter += 1;
                if (this.infiniteLoopCounter > settings.jumpLimit) {
                    var m="You have an infinite loop.\nI stopped it.";
                    alert(m);
                    break;
                }
            }

            // Setting it up to go into the jump functionality next loop around
            if (result === 'j') {
                this.jump = true;
            }
            
            // Reading the line and performing action
            if (result === null) {
                console.log("PROGRAM EXIT:\n" + line);
                break;    // Have to break to exit here, no delay :)
            }
        }

        // Since the code has finished running, we update registers and output
        this.updateRegisterDisplay("Execution Finished. Complete code has been run");
    },

    // This will read each line and send the line to the correct function
    // that will execute it
    read: function(line) {
        if (this.stepThroughStarted) {
            ui.updateLinesCompleted(program.getCurrentLine(), program.lines - 1);
            reg.updateAll();
        }
        if (program.lines == program.getCurrentLine() + 1) {
            console.log("ALL LINES RUN");
            // Have to reset the step through to false since we finished
            this.stepThroughStarted = false;
            console.clear();
            return;
        }
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

        // If it's none of those, we'll check if it's an operation and do it
        return this.performOperation(line);
    },

    // Performs the selected operation on the line
    performOperation: function(line) {
        // Checking for the correct comma's in the line
        // console.log(line);
        var code = regex.getOperationCode(line);

        // Checking if the operation exists
        if (operations[code] == undefined) {
            error.invalidOperation(program.getCurrentLine());
        }

        var instructionArray = operations[code].readInstruction(line);

        if (instructionArray === null) {
            error.syntaxError(program.getCurrentLine());
        }

        // This will perform the desired operation using the register values
        // and immediates that were obtained from the line
        operations[code].operation(instructionArray);

        // Checking if we're in step-through-mode and if so, update registers
        if (this.stepThroughStarted) {
            this.updateRegisterDisplay("Line: " + program.getCurrentLine() + "\nExecuted");
        }

        return operations[code].returnValue;
    },

    // function that will log to console and update register display
    updateRegisterDisplay: function(msg) {
        reg.updateAll();        
        console.log(msg);
    },

    
    // These store the line of the code to jump to, and the amount of jumps
    jumpLocation: 0,
    infiniteLoopCheck: 0
};
