
// do not push into a new array
// do not use reverse

const array = [1, 2, 3, 4, 5, 6] // [6, 5, 4, 3, 2, 1]

// loop 1 -> [6, 2, 3, 4, 5, 1]
// loop 2 -> [6, 5, 3, 4, 2, 1]
// loop 3 -> [6, 5, 4, 3, 2, 1]

function reverseArrayInPlace(array) {
    for (let i = 0; i < array.length / 2; i++) {
        let tempVar = array[i]

        array[i] = array[array.length - 1 - i]
        array[array.length - 1 - i] = tempVar
    }

    return array
}

const result = reverseArrayInPlace(array)

console.log(result)