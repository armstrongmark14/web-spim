var parser = {
    codeLocation: 'code-box',
    code: [],
    lines: 0,
    currentLine: 0,
    // Returns the next line in the file
    nextLine: function() {
        if (this.currentLine >= this.lines) {
            return [];
        }
        this.currentLine += 1;
        return this.code[this.currentLine - 1];
    },
    // Getting the line as an array of non-whitespace items
    parseLine: function() {
        return this.nextLine().match(/\S+/g);
    },
    // Reads the file code into parser.code array of lines
    readCode: function() {
        this.currentLine = 0;
        parser.code = [];
        var code = document.getElementById(this.codeLocation);
        code = code.value.split('\n');
        this.lines = code.length;
        for (var i = 0; i < code.length; i++) {
            parser.code.push(code[i]);
        }
    },
    
    // Will find the location of a procedure in the code
    findProcedure: function(procedure) {
        var pLocation = null;
        var loc;
        procedure += ':';

        for (var i = 0; i < this.lines; i++) {
            loc = this.code[i].match(/\S+/g);

            if (loc != null && loc[0] === procedure) {
                pLocation = i;
                break;
            }
        }

        return pLocation;
    },

    // This will allow you to execute a jump and change current read location
    jumpTo: function(newLocation) {
        this.currentLine = newLocation;
    }
};

