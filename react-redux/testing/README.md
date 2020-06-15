# Testing

`create-react-app` gives us the following dependancies:

#### React

The library

#### Webpack

Links together JS files

#### Jest

Automated test runner

`npm test` or `npm run test` did the following:

1. Test test running stars up
2. Jest finds all files ending in `.test.js` and executes tests indide of them
3. Jest prints out results of tests to the terminal
4. Jest waits for a file to change, then runs all tests again

## Redux Design

#### State

- `comments` for example `["I'm a comment", "Another comment"]`

#### Actions

- `saveComment` Adds a comment via the 'comments' reducer

## Component Design

App Component

- CommentBox Component
- CommentList Component

## Flow

Anytime you run tests, follow these steps:

1. Look at each invididual part of your application (Reducer, Action, Component, Hook, etc)
2. Imagine telling a friend 'heres what this piece of code does'
3. Write a test to verify each part does what you expect

### Jest Basics

Jest will read files the following structure:

`/components`

- `/_tests`
- - `App.js`
- - `App.test.js`
- - `App.spec.js`
- `App.js`
- `App.spec.js`
- `App.test.js`

### Test Structure

`it` - global function (not need to import)
`(args1)` - string description of the test we are running; used to communicate intent
`(args2)` - function that has the test logic

Jest is ran from the command line environment
React code is ran from the browswer

Jest installs `JSDOM`, which is a JavaScript implementation of the DOM and imitates the browser when we run test

`const div = document.createElement('div')` (creates a div, not a real div, exists in memory)
`ReactDOM.render(<App />, div)` (renders div)
`ReactDOM.unmountComponentAtNode(div)` (cleanup - looks at the div, finds the app component, and destorys that app component)

### Test Expectations

`expect` - global function
`(value)` - the value we want to verify
`mather statement` - designates how we want to inspect the 'subject'
`expected value` - expected value, its what we want our 'subjeect' to be
