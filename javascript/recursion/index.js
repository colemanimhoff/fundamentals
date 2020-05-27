
// Factorial
// 4 -> 4 * 3 * 2 * 1 = 24
// 3 -> 3 * 2 * 1 = 6

function factorial(num) {
    if (num === 1) { // base case
        return num
    }

    if (num > 1) { // recursive case
        return num * factorial(num - 1)
    }
}

const test = factorial(4)

console.log(test)

// callstack - represents the order of functions are called in and what variables functions are being called with
// with this function and argument...
// num = 1 | factorial(1) -> 1
// num = 2 | factorial(2) -> 2
// num = 3 | factorial(3) -> 6
// num = 4 | factorial(4) -> 24