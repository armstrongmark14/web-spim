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
    },
    
    // Will find the location of a procedure in the code
    findProcedure: function(procedure) {
        var pLocation = null;
        var loc;
        procedure += ':';

        for (var i = 0; i < this.lines - 1; i++) {
            loc = this.code[i].match(/\S+/g);

            if (loc != null && loc[0] === procedure) {
                pLocation = i;
                break;
            }
        }

        if (pLocation == null) {
            var line = "\n\nProcedure: " + procedure + "\nJumped from line: ";
            line += this.currentLine - 1;
            alert("You jumped to a procedure that doesn't exist"+line);
            throw new Error("Procedure doesn't exist: " + procedure);
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

