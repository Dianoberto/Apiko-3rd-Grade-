//Task_1
function isString(callback, value) {
  if (typeof value !== "string" || typeof callback !== "function") {
    console.error("Значення має бути стрічкою, а колбек - функцією");
    return;
  }

  callback(value);
}

isString(function (value) {
  console.log("Значення: ", value);
}, "Це стрічка");

// Вивід:
// Значення: Це стрічка
//Task_2
function clock() {
  const interval = setInterval(() => {
    const now = new Date();
    console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)
  }, 1000);

  // Зупинити годинник
  // clearInterval(interval);
}

clock();
//Task_3
function timer(seconds) {
  let s = seconds;
  const interval = setInterval(() => {
    console.log(`Timer: ${s}`);
    s--;
    if (s <= 0) {
      clearInterval(interval);
    }
  }, 1000);
}

timer(10);
//Task_4
class Person {
  constructor(name) {
    this.name = name;
    // Запуск таймера за 5 секунд
    setTimeout(() => {
      this.name = null;
    }, 5000);
  }

  // Зупинка таймера
  stopTimer() {
    clearTimeout(this.timer);
    this.timer = null;
  }
}

const person = new Person("Іван");
console.log(person.name); // Іван

// Зупинка таймера
person.stopTimer();
console.log(person.name); // null
