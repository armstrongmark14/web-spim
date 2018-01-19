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
            // This reads the line and tests the return value
            if(instructionParse.read(line)) {
                // If this returns true we have a jump
                i = program.getCurrentLine();
            }

            if (this.infiniteLoopCounter > settings.jumpLimit) {
                var m="You have an infinite loop.\nI stopped it.";
                alert(m);
                break;    // Breaking the loop if we hit the jump limiter 
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
            return 'comment';
        }
        else if (regex.isProcedure(line)) {
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

        var result = false;
        // Checking for jumps and executing them
        if (this.jumpCheck(operations[code].returnValue)) {
            result = true;
        }

        return result;
    },

    // function that will log to console and update register display
    updateRegisterDisplay: function(msg) {
        reg.updateAll();        
        console.log(msg);
    },

    // Checking for jumps
    jumpCheck: function(result) {
        // Doing this right after the instruction is read so we go around
        // again if we break for the load/branch/jump delay slot :)
        if (this.jump && result != 'comment' && result != 'procedure') {
            // Have to update cursor location, change loop variable
            program.jumpTo(this.jumpLocation);
            this.jumpLocation = null;
            this.jump = false;

            // Checking for infinite loop because you know it'll happen
            this.infiniteLoopCounter += 1;
        }

        // Setting it up to go into the jump functionality next loop around
        if (result === 'j') {
            this.jump = true;
        }

        // We are not breaking program execution, so return false
        return false; 
    },

    // These store the line of the code to jump to, and the amount of jumps
    jumpLocation: 0,
    infiniteLoopCheck: 0
};
