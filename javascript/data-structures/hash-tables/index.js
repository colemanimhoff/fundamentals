
function HashTable(size) { // makes an array of a predetermined size
    this.buckets = Array(size)
    this.numBuckets = this.buckets.length
}

function HashNode(key, value, next) {
    this.key = key
    this.value = value
    this.next = next || null // refers to the next node in the bucket if we have any collisions
}

HashTable.prototype.hash = function (key) {
    let total = 0

    for (let i = 0; i < key.length; i++) {
        total += key.charCodeAt(i)
    }

    const bucket = total % this.numBuckets
    return bucket
}

HashTable.prototype.insert = function (key, value) {
    const index = this.hash(key)

    if (!this.buckets[index]) {
        this.buckets[index] = new HashNode(key, value)
        return
    }

    if (this.buckets[index].key === key) { // if key is same, update the value
        this.buckets[index].value = value
        return
    }

    let currentNode = this.buckets[index]
    while (currentNode.next) {
        if (currentNode.next.key === key) { // if key is same, update the value
            currentNode.next.value = value
            return
        }

        currentNode = currentNode.next
    }

    currentNode.next = new HashNode(key, value)
}

HashTable.prototype.get = function (key) {
    const index = this.hash(key)

    if (!this.buckets[index]) {
        return null
    }

    let currentNode = this.buckets[index]

    while (currentNode) {
        if (currentNode.key === key) {
            return currentNode.value
        }

        currentNode = currentNode.next
    }

    return null
}

HashTable.prototype.getAll = function () {
    let nodes = []

    for (let i = 0; i < this.numBuckets; i++) {
        if (!this.buckets[i]) {
            continue
        }

        let currentNode = this.buckets[i]

        while (currentNode) {
            nodes.push(currentNode)
            currentNode = currentNode.next
        }
    }

    return nodes
}

const ht = new HashTable(30)

// insert values

ht.insert('Dean', 'dean@gmail.com')
ht.insert('Megan', 'megan@gmail.com')
ht.insert('Dane', 'dane@gmail.com')
ht.insert('Joe', 'joey@facebook.com')
ht.insert('Samatha', 'sammy@twitter.com')

// update values

ht.insert('Dean', 'deanmachine@gmail.com')
ht.insert('Megan', 'megansmith@gmail.com')
ht.insert('Dane', 'dane1010@outlook.com')

const all = ht.getAll()
console.log(all)

