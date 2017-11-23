file = open('table.txt', 'w')

for i in range(0, 2):

    file.write("<tr>")
    file.write("<td><input id=\"$v%d-input\" class=\"form-control reg-input\" type=\"number\" autocomplete=\"off\"></td>" % (i))
    file.write("<th>$v%d</th>" % (i))
    file.write("<td id=\"$v%d-decimal\"></td>" % (i))
    file.write("<td id=\"$v%d-hex\"></td>" % (i))
    file.write("<td id=\"$v%d-binary\"></td>" % (i))
    file.write("</tr>")

file.write("<tr><td colspan=\"5\"></td></tr>")

for i in range(0, 4):

    file.write("<tr>")
    file.write("<td><input id=\"$a%d-input\" class=\"form-control reg-input\" type=\"number\" autocomplete=\"off\"></td>" % (i))
    file.write("<th>$a%d</th>" % (i))
    file.write("<td id=\"$a%d-decimal\"></td>" % (i))
    file.write("<td id=\"$a%d-hex\"></td>" % (i))
    file.write("<td id=\"$a%d-binary\"></td>" % (i))
    file.write("</tr>")

file.write("<tr><td colspan=\"5\"></td></tr>")

for i in range(0, 10):

    file.write("<tr>")
    file.write("<td><input id=\"$t%d-input\" class=\"form-control reg-input\" type=\"number\" autocomplete=\"off\"></td>" % (i))
    file.write("<th>$t%d</th>" % (i))
    file.write("<td id=\"$t%d-decimal\"></td>" % (i))
    file.write("<td id=\"$t%d-hex\"></td>" % (i))
    file.write("<td id=\"$t%d-binary\"></td>" % (i))
    file.write("</tr>")

file.write("<tr><td colspan=\"5\"></td></tr>")

for i in range(0, 8):

    file.write("<tr>")
    file.write("<td><input id=\"$s%d-input\" class=\"form-control reg-input\" type=\"number\" autocomplete=\"off\"></td>" % (i))
    file.write("<th>$s%d</th>" % (i))
    file.write("<td id=\"$s%d-decimal\"></td>" % (i))
    file.write("<td id=\"$s%d-hex\"></td>" % (i))
    file.write("<td id=\"$s%d-binary\"></td>" % (i))
    file.write("</tr>")
