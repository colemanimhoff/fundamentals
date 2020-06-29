# new line
print("Python\nis\ngreat!")

# escape
print("\"Python\" is in quotes!")

# concatination
language = "python"
phrase = "is great"
print(language + " " + phrase)

# methods

name = "Coleman"
print(name.lower())
print(name.upper())
print(name.isupper())

# chaining methods

print(name.lower().islower())

# length

print(len(name))

# indexing strings

# returns "C"
print(name[0])

# returns "n"
print(name[len(name) - 1])

# throws an Index Error: index out of range error
# print(name[len(name)])

# returns 0
print(name.index("C"))

# replaces "Cole" with "Mole"

print(name.replace("Cole", "Mole"))
