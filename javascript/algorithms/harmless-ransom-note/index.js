
// harmless ransom note
// function takes in two arguments -> (noteText, magazineText)
// return bool determining whether or not you have enough words in the magazineText for the note

// this has a big O notation of O(n + m)

function harmlessRansomNote(noteText, magazineText) {
    let noteArray = noteText.split(' ')
    let magazineArray = magazineText.split(' ')
    let magazineObj = {}
    let noteIsPossible = false

    magazineArray.forEach(word => {
        if (!magazineObj[word]) {
            magazineObj[word] = 1
        } else {
            magazineObj[word]++
        }
    })

    noteArray.forEach(word => {
        if (magazineObj[word] >= 1) {
            magazineObj[word]--
            noteIsPossible = true
        } else {
            noteIsPossible = false
        }

        if (!noteIsPossible) { // if at any point a note is not possible, return out of function
            return false
        }
    })

    return noteIsPossible
}

const noteIsPossible = harmlessRansomNote(
    'the magazine is in the magazine',
    'this is all the magazine text in the magazine'
)

console.log(noteIsPossible)
