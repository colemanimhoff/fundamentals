
function meanMedianMode(array) {
    return {
        mean: getMean(array),
        median: getMedian(array),
        mode: getMode(array)
    }
}

function getMean(array) {
    var sum = 0

    for (let i = 0; i < array.length; i++) {
        sum = sum + array[i]
    }

    return sum / array.length // mean is the average num
}

function getMedian(array) {
    array = array.sort(function (a, b) {
        return a - b
    })

    if (!array.length % 2 === 0) { // if length of array is odd
        return array[Math.floor(array.length / 2)]
    }

    let mid1 = array[(array.length / 2) - 1] // if length of array is even
    let mid2 = array[array.length / 2]

    return (mid1 + mid2) / 2
}

function getMode(array) {
    let modeObj = {}

    for (let i = 0; i < array.length; i++) {
        if (!modeObj[array[i]]) {
            modeObj[array[i]] = 1
            continue
        }

        modeObj[array[i]]++
    }

    console.log(modeObj)

    let max = 0
    let modes = []
    for (let num in modeObj) {
        if (modeObj[num] > max) { // if the current num is greater than the current max
            modes = [num]
            max = modeObj[num]
        } else if (modeObj[num] === max) { // if the current num is equal to the current max
            modes.push(num)
        }

        if (modes.length === Object.keys(modeObj).length) { // all nums have the same frequency
            modes = []
        }
    }

    return modes
}

const result = meanMedianMode([9, 10, 23, 10, 23, 9])

console.log(result)