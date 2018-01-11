var parser = {
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
        var line = this.nextLine();
        if (regex.isEmptyLine(line)) {
            return "#";    // Making null lines into commented lines ;)
        }
        return line;
    },
    // Reads the file code into parser.code array of lines
    readCode: function() {
        this.currentLine = 0;
        this.code = [];
        this.code = editor.getValue().split('\n');
        this.lines = this.code.length;
        // this.code[this.lines] += '\n';
    },
    
    // Will find the location of a procedure in the code
    findProcedure: function(procedure) {
        var pLocation = null;
        var r = new RegExp('\^\\s*' + procedure + ':');

        // finding the procedure if it's in the code
        for (var i = 0; i < this.lines - 1; i++) {
            if (r.test(this.code[i])) {
                pLocation = i;
                break;
            }
        }

        if (pLocation == null) {
            error.invalidJumpLocation(procedure, this.getCurrentLine());
        }

        return pLocation;
    },

    // This will allow you to execute a jump and change current read location
    jumpTo: function(newLocation) {
        this.currentLine = newLocation;
    },

    // Function for getting the actual line we're working with. -For Errors
    getCurrentLine: function() {
        return this.currentLine - 1;
    }
};

