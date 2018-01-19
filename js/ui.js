var ui = {
    updateLinesCompleted: function(line, total) {
        var span = document.getElementById('step-through-lines');
        span.innerHTML = line + '/' + total;
    },
};
