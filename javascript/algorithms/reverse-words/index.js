
// ever word in the string should be reversed, not the entired string
// -> 'this is a string of words' -> 'siht si a gnirts fo sdrow'
// -> do not use the reverse() method

function reverseWords(string) {
    let array = string.split(' ')
    let newArray = []

    for (let i = 0; i < array.length; i++) {
        let newString = ''
        for (let j = array[i].length - 1; j >= 0; j--) {
            newString = newString + array[i][j]
        }

        newArray.push(newString)
    }

    return newArray.join(' ')
}

const result1 = reverseWords('this is a string of words')
const result2 = reverseWords('Coding Javascript')

console.log(result1)
console.log(result2)