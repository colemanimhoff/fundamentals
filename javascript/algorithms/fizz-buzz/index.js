
// fizz buzz
// a func that takes in a num
// if num is divisible by 3 return fizz
// if num is divisible by 5 return buzz
// if num is divisible by 3 and 5 return fizzbuzz
// print all other nums, starting with 1

// input
// 20

// output
// 1
// 2
// fizz
// 4
// buzz
// fizz
// 7
// 8
// 9 fizz
// 10 buzz
// 11
// fizz
// 13
// 14
// fizzbuzz
// 16
// 17
// fizz
// 19
// buzz

fizzbuzz(30)

function fizzbuzz(num) {
    for (let i = 1; i <= num; i++) {
        if (i % 15 === 0) {
            console.log('FizzBuzz')
            continue
        } else if (i % 3 === 0) {
            console.log('Fizz')
            continue
        } else if (i % 5 === 0) {
            console.log('Buzz')
            continue
        } else {
            console.log(i)
        }

    }
}