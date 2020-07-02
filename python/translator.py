def translate(phrase):
    translation = ""
    for letter in phrase:
        if letter.lower() in "aeiou":  # if loop
            if letter.isupper():
                translation = translation + "G"
            else:
                translation = translation + "g"
        else:
            translation = translation + letter

    return translation


user_input = input("Enter a phrase: ")
result = translate(user_input)

print(result)

'''
this is a comment by the way!
'''
