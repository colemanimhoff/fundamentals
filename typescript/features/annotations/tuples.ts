const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40
};

// order matters with tuples
// with the below annotation, order will be protected
const pepsi: [string, boolean, number] = ['brown', true, 40];

// you can also write a type alias
type Drink = [string, boolean, number];

const coke: Drink = ['brown', true, 35];
const water: Drink = ['clear', false, 0];
