# open

# modes
# read (only read the file - "r")
# write (change the file - "w")
# append (add new information to the file "a")
# read and write ("r+")


cats_file = open("cats.txt", "r+")

# check if the file is readable
print(cats_file.read())
for cat in cats_file.readlines():
    print("Read line: %s" % (cat))

# close the file
cats_file.close()
