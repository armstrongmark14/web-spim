var error = {
    // Showing the error message
    showError: function(msg) {
        alert(msg);
        throw new Error(msg);
    },

    // No regex match for the line = invalid syntax somewhere
    syntaxError: function(lineNumber) {
        var msg = "Operation syntax is incorrect. Line: " + lineNumber;
        this.showError(msg);
    },

    // The operation spelling does not match a valid operation
    invalidOperation: function(lineNumber) {
        var msg = "Operation does not exist. Line: " + lineNumber;
        this.showError(msg);
    },

    // Jumped to procedure cannot be found
    invalidJumpLocation: function(procedure, lineNumber) {
        var errorMsg = "Procedure: " + procedure + "\nJumped from line: ";
        errorMsg += lineNumber;
        alert("You jumped to a procedure that does not exist.\n\n" + errorMsg);
        throw new Error("Procedure does not exist: " + procedure);          
    },

    // Infinite loop || Loop Limiter reached
    loopLimitReached: function() {
        var msg = "Loop limit reached. Check for infinite loops";
        throw new Error(msg);          
    },
};
