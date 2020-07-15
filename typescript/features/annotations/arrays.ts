// typescript with infer this array as a string[]
const carMakers = ['ford', 'toyota', 'chevy'];

// if you want to initialize an empty array, you need to add an annotation
const carMakerz: string[] = [];

// you can also store more complex types
const dates = [new Date(), new Date()];

// 2D array
const carsByMake = [['f150'], ['corolla'], ['camaro']];

// initialize a 2D array
const carzByMake: string[][] = [];

// help with inference when extracting values
const car = carMakers[0]; // infers to string
const myCar = carMakers.pop();

// prevent incompatitible values (uncomment to see error)
// carMakers.push(100);

// help with native array methods (this gives us access to autocomplete)
carMakers.map((car: string): string => {
  return car.toUpperCase();
});

// flexible types
const importantDates: (Date | string)[] = [new Date(), '05/04/1984'];
importantDates.push('03/21/92');
importantDates.push(new Date());
