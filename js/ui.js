var ui = {
    styledLines: [],
    updateLinesCompleted: function() {
        var span = document.getElementById('step-through-lines');
        span.innerHTML = program.getCurrentLine() + '/' + (program.lines - 1);
    },

    // Highlighting only the line given
    highlightCurrentLine: function(lineNumber) {
        ui.clearHighlightedLines();
        ui.styleLine(program.getCurrentLine());
    },

    // For styling the current line in step-through mode
    styleLine: function(lineNumber) {
        this.styledLines.push(editor.markText(
            { line: lineNumber, ch: 0 },
            { line: lineNumber, ch: editor.getLine(lineNumber).length },
            { className: "highlighted-line" }
        ));
    },

    // Clearing previously styled lines
    clearHighlightedLines: function() {
        if (this.styledLines.length > 0) {
            this.styledLines.forEach(marker => marker.clear());
            this.styledLines = [];
        }
    }

};
