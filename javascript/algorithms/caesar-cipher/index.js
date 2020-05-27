
function caesarCipher(str, num) {
    num = num % 26 // if num is > 26 || num < 26; refrain from many loops
    let lowerCaseStr = str.toLowerCase()
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
    let newString = ''

    for (let i = 0; i < lowerCaseStr.length; i++) {
        if (lowerCaseStr[i] === ' ') { // honor spaces
            newString = newString + lowerCaseStr[i]
            continue
        }

        let newIndex = alphabet.indexOf(lowerCaseStr[i]) + num

        if (newIndex > 25) { // move back to beginning
            newIndex = newIndex - alphabet.length
        }

        if (newIndex < 0) { // move to the end
            newIndex = alphabet.length + newIndex
        }

        let newLetter = alphabet[newIndex]

        if (str[i] === str[i].toUpperCase()) {
            newString = newString + newLetter.toUpperCase()
        } else {
            newString = newString + newLetter
        }
    }

    return newString
}

const result1 = caesarCipher('Zoo Keeper', 2) // Bbq Mggrgt
const result2 = caesarCipher('Big Car', -16) // Lsq Mkb
const result3 = caesarCipher('Javascript', -900) // Tkfcmbszd
console.log(result1)
console.log(result2)
console.log(result3)