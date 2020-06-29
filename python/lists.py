# lists
# lists can contain different data types

cats = ["Sylvester", "Sully", "Chibi"]

# all
print(cats)

# specific
print(cats[0])

# range
print(cats[0:2])
print(cats[1:])

# funcs

# extend - append another list

otherCats = ["Jem", "Mackie"]

cats.extend(otherCats)

print(cats)

# append

cats.append("Bug")

print(cats)

# insert - at a specific index

cats.insert(len(cats) - 1, "Fern")

# remove

cats.append("Luna")
cats.remove("Luna")

print(cats)

# removes last item
cats.pop()

print(cats)

cats.append("Bug")

# index of list item
print(cats.index("Fern"))

# count instances of list item
print(cats.count("Fern"))

# sort
cats.sort()
print(cats)

# reverse
cats.reverse()
print(cats)

# copy

cats2 = cats.copy()
print(cats2)

# clear
cats.clear()

print(cats)
