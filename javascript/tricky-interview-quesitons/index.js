console.log(2 + '2') // 22 (+ operator can be applied to numbers and strings)
console.log(2 - '2') // 0 (javascript will convert the string to a number)

let nums = [1, 2, 2, 3] // remove the dupes with no loops in a singleline

let set = [...new Set(nums)] // use the Set contructor and spread operator to copy

console.log(set)

console.log(5 < 6 < 7) // true (true gets converted to 1)
console.log(7 > 6 > 5) // false (true gets converted to 1)

let a = () => arguments // arguments inside an => don't bind

console.log(a('hi'))

let x = function () {
  // return must be on the same line because javascript will insert a ;
  return {
    message: 'hi',
  }
}

console.log(x())

let profile = {
  name: 'techsmith',
}

Object.freeze(profile) // you won't be able to mutate
// Object.seal(profile) // <- edit existing properties but not new ones

// Object.defineProperty(profile, 'age', { // <- control properties
//   value: 3,
//   writable: false,
// })

profile.age = 3

console.log(profile)

console.log(Math.max()) // -Infinity (only number available)
