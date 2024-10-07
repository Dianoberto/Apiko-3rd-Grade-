//Task_1
// Функція compose
const compose = (...functions) => input => functions.reduce((result, func) => func(result), input);

// Функція modifyArray
const modifyArray = modifyCondition => data => data.map(modifyCondition);

// Функція capitalizeAllFirst
const capitalizeAllFirst = compose(
  modifyArray(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()),
  arr => arr.join('-'),
  result => {
    console.log(`Result: ${result}`);
    console.log(`Length: ${result.length}`);
  }
);

// Функція allToLower
const allToLower = compose(
  modifyArray(str => str.toLowerCase()),
  arr => arr.join(' - '),
  result => {
    console.log(`Result: ${result}`);
    console.log(`Length: ${result.length}`);
  }
);

// Підготовлений код
const arr = ["CusTom", "Web", "aNd", "MoBile", "PlaTfoRms"];

capitalizeAllFirst(arr);
allToLower(arr);
