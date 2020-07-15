# TypeScript

- Helps us catch errors during development

- Uses 'type annotations' to analyze code

- Only active during development

- Doesn't provide any performance optimization

## How it Works

1. We write JavaScript code with type annotations
2. Our code gets fed into the TypeScript compilier
3. Our code is executed as JavaScript

## What You Need To Know

### Syntax + Features

#### Types

A type is a shortcut to refer to the different properties and functions that a value has. They give the TypeScript compilier information to analyze our code for errors.

##### Primitive Types

- number
- boolean
- void
- undefined
- string
- symbol
- null

##### Object Types

- functions
- arrays
- classes
- objects

##### Type Annotations

Code we add to tell TypeScript what type of value a variable will refer to

##### Type Inference

Typescript tries to figure out what type of value a variable refers to

It starts with variable declariation, then variable initialization:

```typescript
const color = 'red';
```

If declariation and initialization are on the same line, TypeScript will figure out the type of 'color' for us.

##### Typed Arrays

Arrays where each element is some consistent type of value. You can, of course, build arrays with different value types, but you need to be explicit about it.

You want to use typed arrays any time you need to represent a collection of records with some arbitrary sort order.

##### Tuples

An array-like structure where each element represents some property of a record.

A good use case for a tuple when working with a `csv` file, but other than that, tuples are rarely used. Also, tuples don't describe what the codes means as well as an object.

```typescript
const carSpecs: [number, number] = [400, 3354];
```

vs

```javascript
const carSpecs = {
  horsepower: 400,
  weight: 3354
};
```

##### Classes

A blueprint to create an object with some fields (values) and methods (functions) to represent a "thing".

Interfaces and Classes allow us to get really strong code reuse in TS.

###### Modifiers

Keywords that we can place on methods or properties inside of a class.

`public` - This method can be called any where, any time
`private` - This method can only be called by other methods in this class
`protected` - This method can be called by other methods in this class, or by other methods in child classes

### Design Patterns

#### Interfaces

Creates a new type, describing the property names and value types of an object
