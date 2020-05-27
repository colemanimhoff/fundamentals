
// Exponential Runtime
// Big O Notation: "O (n^2)"

function addAndLog(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            console.log(array[i] + array[j])
        }
    }
}

addAndLog(['A', 'B', 'C']) // logs 9 pairs
addAndLog(['A', 'B', 'C', 'D']) // logs 16 pairs
addAndLog(['A', 'B', 'C', 'D', 'E']) // logs 25 pairs
