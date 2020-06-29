# a guessing game!
def init_game(secret_word, limit):
    guess = ""
    while guess != secret_word:
        print(str(limit) + " guesses remaining...")
        if limit == 0:
            print("You lose!")
            break
        else:
            guess = input("Enter guess: ")

        limit -= 1

    if guess == secret_word:
        print("You win!")


init_game("python", 3)
