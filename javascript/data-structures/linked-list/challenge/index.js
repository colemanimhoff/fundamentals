
const { performance } = require('perf_hooks')

function Queue() {
    this.head = null
    this.tail = null
    this.count = 0
}

function Node(value, next, prev) {
    this.value = value
    this.next = next
    this.prev = prev
}

function User(id, name, phoneNumber) {
    this.id = id
    this.name = name
    this.phoneNumber = phoneNumber
}

Queue.prototype.enqueue = function (value) {
    let newNode = new Node(value, null, this.tail)

    if (this.tail) {
        this.tail.next = newNode
    }

    if (!this.tail) {
        this.head = newNode
    }

    this.tail = newNode
    this.count = this.count + 1
}

Queue.prototype.dequeue = function () {
    if (!this.head) {
        return null
    }

    if (this.head) {
        let val = this.head.value
        this.head = this.head.next

        if (this.head) {
            this.head.prev = null
        }

        if (!this.head) {
            this.tail = null
        }

        this.count = this.count - 1

        return val
    }
}

Queue.prototype.walk = function (walker) {
    const start = performance.now()
    let currentNode = this.head

    while (currentNode) {
        walker(currentNode)
        currentNode = currentNode.next
    }

    const end = performance.now()
    console.log('Walking took:', end - start, 'milliseconds')
}

Queue.prototype.getStats = function () {
    let placeInLine = 1
    let currentNode = this.head
    let stats = []

    while (currentNode) {
        let stat = {
            user: currentNode.value,
            placeInLine: placeInLine,
            averageWaitTime: 'TBD'
        }

        stats.push(stat)
        placeInLine++
        currentNode = currentNode.next
    }

    return stats
}

const queue = new Queue()

const user1 = new User('1', 'coleman', '303-555-1234')
const user2 = new User('2', 'thad', '303-555-3214')
const user3 = new User('3', 'david', '303-555-1111')
const user4 = new User('4', 'shaina', '303-555-2222')

function logValue(node) {
    console.log('Enqueued User: ', node.value)
}

queue.enqueue(user1)
queue.enqueue(user2)
queue.enqueue(user3)
queue.enqueue(user4)

queue.walk(logValue)

let stats = queue.getStats()
console.log(stats)

const dequeuedUser = queue.dequeue()
console.log('Dequeued User: ', dequeuedUser)

queue.walk(logValue)
stats = queue.getStats()
console.log(stats)

