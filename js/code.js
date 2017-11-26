
reg.updateAll();

reg.loadValues();

function run() {
    console.log(parser.lines);
    reg.loadValues();
    var time = new Date();
    instructionParse.run();
    var end = new Date();
    console.log( "TIME: " + (time.getTime() - end.getTime()) / 1000);
}

function resetInitialValues() {
    reg.resetInitialValues();
}

function setValues() {
    reg.setValues();
}

