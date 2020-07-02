'''
if the user enters a letter in this program, it will throw an invalid literal for int() error, and the program will break. We can throw things in an try and expect block
'''

try:
    10 / 0
    user_input = input("Enter a number: ")
    number = int(user_input)
except ZeroDivisionError as err:  # this is best practice in python
    print("error", err)
except ValueError as err:
    print("invalid input", err)
