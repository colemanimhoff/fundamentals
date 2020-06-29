# get user input and assign it to a variable

name = input("Enter your name: ")
age = input("Enter your age: ")
print("Hello, " + name + "! You are " + age + ".")

# by defualt, python will convert any data type you enter into a string. therefore, numbers will be concatinated
# passing user input into the float func will allow conversion of a whole number or float
# Passing user input into int func will break if a user enters a float

num1 = input("Enter a number: ")
num2 = input("Enter another number: ")

result = float(num1) + float(num2)
