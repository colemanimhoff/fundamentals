# React

Renders your UI and responds to events
AKA: the "V" in MVC

Declarative - easier to reason about, predict, and debug
Component-Based - encapsulated components manage their own state

Consists of two libraries - React & ReactDOM

React is the code which determines what a React Component is and how components work together
ReactDOM takes the components and builds the virtual DOM

## Buidling Components, Not Templates

Separation of Concerns - reducing coupling and increasing cohesion

Coupling is - the degree to which each program module relies on each of the other modules
Cohesion - the degree to which elements of a module belong together

Display logic and markup are inevitably tightly coupled. How do you find DOM nodes?

Display logic and markup are highly cohesive. They both show in the UI.

Templates tend to separate technologies, not concerns. In addition, templates are `underpowered`. This results in :
- Reliance on primitive abstractions
- Inventing lots of new concepts that already exist in JavaScript

Pete Hunt, React -
  "The framework cannot know how to separate your concerns for you. It hsould only provide `powerful expressive tools` for the user to do it correctly."

A lot of frameworks force you into an MVC model. MVC has it's advantages, but this can result in bloating. In addition, the vocabulary you use is that of the framework and not of your appliation.

React components are `highly cohesive` building blocks for UIs `loosely coupled` with other components.

React wants you to use `components` to separate your concerns with the full power of JavaScript, not a templating language.

Components are:
- reusuable
- composable
- units (testable)
- small (don't write spaghetti code)

Only write display logic in your components!

React has the `accessibity` of templates and the `power` of JavaScript.

## Data Changes

When `data changes`, React re-renders the entire component. React components are basically just idempotent functions. They describe your UI at `any point in time`, just like a server-rendered app.

Idempotence is the property of certain operations in mathematics and computer science whereby they can be applied multiple times without changing the result beyond the initial application.

Re-rendering on every change makes things simple. Every place data is displayed is guaranteed to be up-to-date, without data binding magic, or model dirty checking. There are no more explicity DOM operations - `everything is declarative`

In computer science, declarative programming is a programming paradigm—a style of building the structure and elements of computer programs—that expresses the logic of a computation without describing its control flow.

Rerending on every change sounds expensive. That's way React has a `virutal DOM`

## Virutal DOM

The `virtual DOM` makes re-rendering on every change `fast`. You can't just throw out the `DOM` and rebuilt it on each update. It's too slow and you'll lose form state and scroll position. Therefore, react built a `virtual DOM` (and events system) optimized for performance and memory footprint.

How it works:

On every `setState` call, React...

- builds a new `virtual DOM` subtree
- diffs the new tree with the old one
- computes the minimal set of DOM mutations and puts them in a queue
- and batch executes all updates

It's `fast` because the DOM is slow. React computes minimal DOM operations and batches reads and writes for optimal performance. It has automatic top-level `event delegation` (with cross-browser HTML5 events) which creates synthetic events. It provides hooks for `custom update logic`, though they're alomst never used.

React runs at `60 fps`.
`Re-render` don't mutate!

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

An `optional` syntax extension to JavaScript containing a combination of HTML and JS syntax. After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects. This means that you can use JSX inside of if statements and for loops, assign it to variables, accept it as arguments, and return it from functions.

### Specifying Attributes with JSX

With string literals:

```javascript
const element = <div tabIndex="0"></div>;
```

With embedded JavaScript expressions:

```javascript
const element = <img src={user.avatarUrl}></img>;
```

Don’t put quotes around curly braces when embedding a JavaScript expression in an attribute. You should either use quotes (for string values) or curly braces (for expressions), but not both in the same attribute.

React DOM uses camelCase for it's property naming.

JSX prevents injection attacks by escaping embedded values by default and ensures that you can never inject anyting that's not explicity written in your application.

Babel compiles JSX down to `React.createElement()` calls

```javascript
const App = () => { return <div className="app">Hello</div> }
```

compiles to this:

```javascript
const App = () => { return /*#__PURE__*/React.createElement("div", { className: 'app' }, "Hello"); };
```

## Rendering Elements


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

### Steps to Create a HOC

![Higher Order Component Steps](higher-order-component-steps.png)

By convention, we name our HOC files leading with a lowercase letter. `requireAuth.js`. This is because, this helps differentiate files that returns a `function` vs a class

We need to make sure we pass props to our child component like so:

```javascript
<ChildComponent {...this.props} />
````
