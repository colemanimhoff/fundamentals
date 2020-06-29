
# unlike javascript, these functions do not hoist

def say_hi(name, age):
    print("Hello, " + name + ". You are " + str(age) + '.')


say_hi("Coleman", 36)

# return - without it, python returns none


def add(num1, num2):
    return num1 + num2
    print("this wont' be printed!")


sum = add(2, 2)

print(sum)
