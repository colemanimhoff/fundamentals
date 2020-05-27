
// return a bool if a string is a palindrome (spelled the same forwards and backwords)

// input | output
// 'Madam I'm Adam' | true

function isPalindrome(string) {
    string = string.toLowerCase()
    const charArray = string.split('')
    let validCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'm', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    let lettersArray = []
    charArray.forEach(char => {
        if (validCharacters.indexOf(char) > -1) { // this keeps us from looping over validCharacters everytime
            lettersArray.push(char)
        }
    })

    if (lettersArray.join() === lettersArray.reverse().join()) {
        return true
    }

    return false
}

console.log(isPalindrome('Madam I\'m Adam'))
console.log(isPalindrome('Racecar'))
console.log(isPalindrome('Wrong Answer'))