//Task_1
// write below code for global scope
let globalVar = "I am a global variable";
function printGlobalVar() {
    console.log(globalVar);
}
printGlobalVar();

// write below code for function scope
function functionScope() {
    let functionVar = "I am a function variable";
    console.log(functionVar);
}
functionScope();
console.log(functionVar);

// write below code for block scopefunction blockScope() {
    {
        let blockVar = "I am a block variable";
        console.log(blockVar);
    }
    console.log(blockVar);
}
blockScope();
//Task_2
const car = {
    name : "Tesla",
    model : "X",
};

function showCarInfo() {
    console.log(this.name, this.model);
}

let boundShowCarInfo = showCarInfo.bind(car);
boundShowCarInfo();
//Task_3
const cat = {
    sound: 'meow',
    greet: function() {
        setTimeout(function() {
            console.log(this.sound)
        }.bind(this), 0)
    }
};
cat.greet(); // should produce "meow"
//Task_4
const dog = {
    sound: 'bark',
    greet: function() {
        setTimeout(() => {
            console.log(this.sound)
        },0)
    }
}

dog.greet(); 
//Task_5
let convert = function(bytes) {
    let mb = bytes / (1024*1024);
    return mb.toFixed(2) + " Mb";
}

console.log(convert.call(null, 10000)); 
//Task_6
const Person = {
    firstName: 'John',
    lastName: 'Doe',
    getFullName: function () {
        const fullName = this.firstName + ' ' + this.lastName;
        return fullName;
    }
};

const testArgs = ['sushi', 'hiking']

let logPersonNameAndInterests = function(...interests) {
    let fullName = this.getFullName();
    console.log(fullName + ' loves: ' + interests.join(', '));
}

logPersonNameAndInterests.apply(Person, testArgs);
