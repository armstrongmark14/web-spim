reg.$t9 = 5;
reg.$t8 = 10;
reg.$t7 = 100;

reg.updateAll();

var test = "mark";

console.log(test.charAt(0));

function run() {
    var time = new Date();
    instructionParse.run();
    var end = new Date();
    console.log( "TIME: " + (time.getTime() - end.getTime()) / 1000);
}
