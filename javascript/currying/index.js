const add = function (a) {
  return function (b) {
    return a + b
  }
}

const addToFive = add(5)(1)

console.log(addToFive)

const avg = function (...n) {
  let total = 0

  for (let i = 0; i < n.length; i++) {
    total += n[i]
  }

  return total / n.length
}

var spiceUp = function (fn, ...n) {
  return function (...m) {
    return fn.apply(this, n.concat(m))
  }
}

let doAverage = spiceUp(avg, 1, 2, 3)

console.log(doAverage(4, 5, 6))
