let myName = 'Coleman' // in JS, the func printName as access to this global variable

function printName() {
  console.log(myName)
}

myName = 'Shaina'

// printName()

// more common use case

function outerFunction(url) {
  fetch(url).then(() => {
    console.log(url)
  })
}

const newFuction = outerFunction('outside')

newFuction('inner')
