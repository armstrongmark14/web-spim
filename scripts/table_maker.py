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

for i in range(0, 2):
    makeRow("v", i)
separator()

for i in range(0, 4):
    makeRow("a", i)
separator()

for i in range(0, 10):
    makeRow("t", i)
separator()

for i in range(0, 8):
    makeRow("s", i)
separator()



