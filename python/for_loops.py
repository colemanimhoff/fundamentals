# for loops

for letter in "python":
    print(letter)

print("---------")

cats = ["Sully", "Sylvester", "Chibi"]

for cat in cats:
    print(cat)

print("---------")

for index in range(3, 10):  # outputs indexes 3 to 9 (index starts at zero)
    print(index)

print("---------")

for index in range(len(cats)):
    print(index)

print("---------")


def count_to_ten():
    for num in range(1, 11):
        print(num)


count_to_ten()
