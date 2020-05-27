
// logarithmic runtime
// Big O Notation: O (log n)

function binarySearch(array, key) {
    let low = 0
    let high = array.length - 1
    let mid
    let element

    while (low <= high) {
        mid = Math.floor((low + high) / 2, 10)
        element = array[mid]

        if (element < key) {
            low = mid + 1
            return
        }

        if (element > key) {
            high = mid - 1
            return
        }

        return mid
    }

    return -1
}
