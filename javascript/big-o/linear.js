
// Linear runtime (runtime is proportional to the input)
// Big O Notation: "0 (n)" [n === size of input]

function logAll(array) {
    for (var i = 0; i < array.length; i++) {
        console.log(array[i])
    }
}

// as input size increases, so do our runtime (loops)
logAll([1, 2, 3, 4, 5])
logAll([1, 2, 3, 4, 5, 6])
logAll([1, 2, 3, 4, 5, 6, 7])
