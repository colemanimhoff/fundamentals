// there is no type inference for arguments in a function declaration
// there is type inference for return values, but you should annotate that regardless

const add = (a: number, b: number): number => {
  return a + b;
};

// function keyword

function divide(a: number, b: number): number {
  return a / b;
}

// anonymous function

const multiply = function (a: number, b: number): number {
  return a * b;
};

const logger = (message: string): void => {
  console.log(message);
};

// if you expect a function to never return anything (rare)

const throwError = (message: string): never => {
  throw new Error(message);
};

const todaysWeather = {
  date: new Date(),
  weather: 'sunny'
};

// destructuring

const logWeather = ({
  date,
  weather
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(date);
  console.log(weather);
};

logWeather(todaysWeather);
