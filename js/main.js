function runFullProgram() {
    console.log(program.lines);
    reg.loadValues();
    var time = new Date();
    instructionParse.run();
    var end = new Date();
    console.log( "TIME: " + (time.getTime() - end.getTime()) / 1000);
    // Resetting the UI pieces
    ui.updateLinesCompleted(program.lines - 1, program.lines - 1);
}

function runNextLine() {
    ui.clearHighlightedLines();
    if (! instructionParse.stepThroughStarted) {
        // Have to load in the register values and update them first thing
        reg.loadValues();
        // Resetting the instructionParse object so that we don't mistakenly
        // use values from the last run
        instructionParse.reset();
        // Reading the code from the textarea into the parser
        program.readCode();
    }
    // Now running the code, have to set to true first to use step-through
    instructionParse.stepThroughStarted = true;
    instructionParse.read(program.nextLine());
}

function resetInitialValues() {
    reg.resetInitialValues();
}

function setValues() {
    reg.setValues();
}

function resetSimulator() {
    program.reset();
    instructionParse.reset();
    // Resetting all the register values to their initial loaded values
    reg.loadValues();
    reg.updateAll();
    // Resetting the UI pieces
    ui.clearHighlightedLines();
    ui.updateLinesCompleted();
}

