# React

Declarative - easier to reason about, predict, and debug
Component-Based - encapsulated components manage their own state

Consists of two libraries - React & ReactDOM

React is the code which determines what a React Component is and how components work together
ReactDOM takes the components and builds the virtual DOM

## Class Components

- Must be a JavaScript Class
- Must extend (subclass) React.Component
- Must define a 'render' method that returns some amount of `JSX`

## State

- Only usable with class components (unless you are using hooks!)
- Props are not state
- State is a JS object that contains data relevant to a component
- Updating 'state' on a component causes the component to (almost) instantly re-render
- State must be initialized when a component is created
- State can only be updated using the function `setState`

## JSX

A syntax containing a combination of HTML and JS syntax. Using babel, this:

`const App = () => { return <div>Hello</div> }`

compiles to this:

`const App = () => { return /*#__PURE__*/React.createElement("div", null, "Hello"); };`

## Props

You can define default props to a component. For example:

```javascript
Spinner.defaultProps = {
  message: 'Loading...',
}
```

## Life Cycle Methods

- `constructor`
- `render`
  content (jsx) visible on screen
- `componentDidMount` (called one time)
  sit and wait for updates (setState is called)
- `componentDidUpdate`
  sit and wait until this component is no longer shown; `render` will be called first
- `componentWillUnmount` (clean up)

### Construstor

Good for one time set up, such as setting your initalState. Technically, you can fetch data here, but it is not recommended. If we centralize our data fetching logic inside one centralized lifecycle (`componentDidMount`), then it will lead to more clear code.

### Render

returns `JSX`

It's best to avoid conditional logic (or logic in general) inside the render function. You can define a function, such as `renderList` or `renderContent` outside of the `render` function and you can all that function inside the `render` function.

For example:

```javascript
renderContent() {
  if (this.state.loading) {
    return <Spinner />
  }

  if (this.state.redirect) {
    return <Redirect />
  }

  return <Content />
}

render() {
  return <div>{this.renderContent()}</div>
}
```

### componentDidMount

Perfect for running an outside process or fetching data upon initialization.

### componentDidUpdate

This lifecyle is called anytime our data changes, via `setState` or when a component receives a new `prop` from it's parent

### componentWillUnmount

Good for clean, especially non-React stuff

![Component Lifecycle](component-lifecycle.png)
![Other Lifecycles](other-lifecycles.png)

## Redux

- State management library
- Make creating complex appliations easier
- Not required to create a React app!
- Not explicity designed to work with React

## The Redux Cycle

Action Creator (Person dropping off the form) -> Action (the form) -> dispatch (form reciever) -> Reducers (departments) -> State (central repository)

An analogy!

We are building an insurance company

Policy - customer holds a 'policy' if bad stuff happens to them then we pay them
Claim - custom had something bad happen to them, we need to pay them

Customer fills out a `form`
The customer hands the `form` to the Form Reciever
The Form Reciever makes a copy of the `form` for each department:

Claims History - stores a list of all claims ever made
Policies - stores a list of who has a poliby with our insurance company
Accounting - stores a big bag of cash, we pay people from this

A particular department may not care or need to do anything with a particular from, but they recieve a copy

Inside each department:

Policies Department

`form` to sign up for a policy
|
List of Customers with Policies

- Fred
- Jane
- Alex

Management comes in and asks to see the list of policy holders and stores them in a separate repository separate from the Policy Department. The management team will have access to the list of policy holders, without going back to that department. The same idea applies to the other departments. All data is stored in a central repository

`form` -> claim (type) | name: 'Alex', Amount: \$500 (payload)

(3) different types of forms:

CREATE_POLICY | CREATE_CLAIM | DELETE_POLICY

### Action Creator

An action creator is a function that creates or returns a plain javascript object. This object has an action `type` and a `payload`. The `type` property describes the change we want to make inside of our data. The `payload` propety provides context around the change we want to make.

### Action

The purpose of an action is to describe some change we want to make to the data inside of our application.

### Dispatch

The dispatch function take in an action, make copies of that object and passes it to many areas of our application (reducers)

### Reducer

A reducer is a function that is reponsible for taking in an action and some sort of data (payload). It is going to process that action and makes a change to the data, then returns the data so it can be stored in a central location.

### State

State is a central repository of all data that has been created by our reducers. You can't get access to state directly. You must create an action and pass it to a reducer

## Why Redux

As an app grows, so does it's complexity
With Redux, this curve flattens. Redux helps with self-documentation and escapsulation

![Redux Cycle](redux-cycle.png)

## React-Redux

React -> React-Redux -> Redux

React-Redux allows react and redux to work together

Absolutely understand the purpose of reducers
Absolutely understand making API requests with Redux
Absoletely understand the purpose of middleware, specifically 'redux thunk'

## Higher Order Components

A react component made to help us resuse code

![Higher Order Component](higher-order-component.png)

The `connect` component provided by `react-redux` is an example of a higher order component
