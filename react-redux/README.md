# React

Declarative - easier to reason about, predict, and debug
Component-Based - encapsulated components manage their own state

Consists of two libraries - React & ReactDOM

React is the code which determines what a React Component is and how components work together
ReactDOM takes the components and builds the virtual DOM

# JSX

A syntax containing a combination of HTML and JS syntax. Using babel, this:

`const App = () => { return <div>Hello</div> }`

compiles to this:

`const App = () => { return /*#__PURE__*/React.createElement("div", null, "Hello"); };`

# The Redux Cycle

Action Creator -> Action -> dispatch -> Reducers -> State
