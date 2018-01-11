file = open('table.txt', 'w')

def makeRow(i, d):
    file.write("<tr>\n")
    file.write("    <td><input id=\"$%s%d-input\" class=\"form-control reg-input\" type=\"number\" autocomplete=\"off\"></td>\n" % (i, d))
    file.write("    <th>$%s%d</th>\n" % (i, d))
    file.write("    <td id=\"$%s%d-decimal\"></td>\n" % (i, d))
    file.write("    <td id=\"$%s%d-hex\"></td>\n" % (i, d))
    file.write("    <td id=\"$%s%d-binary\"></td>\n" % (i, d))
    file.write("</tr>\n")

def separator():
    file.write("<tr><td class=\"table-separator\" colspan=\"5\"></td></tr>\n")

def createRegisters(letter, amount):
    for i in range(0, amount):
        makeRow(letter, i)
    separator()

createRegisters("v", 2)
createRegisters("a", 4)
createRegisters("t", 10)
createRegisters("s", 9)

