//Task_1
function Calculator() {
}

Calculator.prototype.sum = function(a, b) {
  return a + b;
};

Calculator.prototype.subtract = function(a, b) {
  return a - b;
};

function AdvancedCalculator() {
  Calculator.call(this);
}

AdvancedCalculator.prototype.multiply = function(a, b) {
  return a * b;
};

AdvancedCalculator.prototype.divide = function(a, b) {
  return a / b;
};
//Task_2
function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

class TodoItem {
  constructor(name, checked = false) {
    this.id = generateId();
    this.name = name;
    this.checked = checked;
  }

  get checked() {
    return this._checked;
  }

  set checked(value) {
    if (value !== true && value !== false) {
      throw new Error("checked must be true or false");
    }
    this._checked = value;
  }
}

class TodoList {
  constructor(name) {
    this.id = generateId();
    this.name = name;
    this.items = [];
  }

  addItem(item) {
    if (!(item instanceof TodoItem)) {
      throw new Error("Can only add TodoItem objects to TodoList");
    }
    this.items.push(item);
  }

  removeItemById(id) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    return this.items.splice(index, 1)[0];
  }

  getItemById(id) {
    return this.items.find((item) => item.id === id);
  }
}

const todoList = new TodoList("My Todo List");

const todoItem1 = new TodoItem("Buy milk");
const todoItem2 = new TodoItem("Do laundry");
const todoItem3 = new TodoItem("Clean the house");
const todoItem4 = new TodoItem("Go to the gym");

todoList.addItem(todoItem1);
todoList.addItem(todoItem2);
todoList.addItem(todoItem3);
todoList.addItem(todoItem4);

console.log(todoList);

todoItem2.checked = true;

console.log(todoList);

const removedItem1 = todoList.removeItemById("_0-0-0-0-0-0-0-0");
const removedItem2 = todoList.removeItemById("_1-0-0-0-0-0-0-0");

console.log(todoList);
