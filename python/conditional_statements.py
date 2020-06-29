# conditional statements
# elif is elseif

is_cat = True
is_sleepy = True

if is_cat and is_sleepy:
    print("I'm a sleepy cat!")
elif is_cat and not(is_sleepy):
    print("I'm just a cat!")
else:
    print("I'm a dog!")


# when it comes to comparisons and is && and or is ||
# not() is !


def max_num(num1, num2, num3):
    if num1 >= num2 and num1 >= num3:
        return num1
    elif num2 >= num1 and num2 >= num3:
        return num2
    else:
        return num3


result = max_num(5, 6, 3)
print(result)

# other comparisons == !=
