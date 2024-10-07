//Task_1
function unicFn(initialArray) {
    return [...new Set(initialArray)];
}
//Task_2
function isEvenArray(initialArray) {
    return initialArray.every(num => num % 2 === 0) ? "YES" : "NO";
}
//Task_3
function filterArray(initialArray) {
    return initialArray.filter(item => typeof item === 'string');
}
//Task_4
function findUser(initialObject) {
    return Object.keys(initialObject).filter(name => initialObject[name].age > 18 && initialObject[name].city === "London");
}
//Task_5
function removeObj(arrayOfObj, keyName, value) {
    return arrayOfObj.filter(obj => obj[keyName] !== value);
}
