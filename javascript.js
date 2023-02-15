// 1. Write a JavaScript program to reverse a given string?
function reverseString(input) {
    if(typeof(input) !== "string") {
        throw new Error("input should be a string.");
    }
    return input.split('').reverse().join('');
}
reverseString("reverse this string.");



// 2. Write a JavaScript program to convert a given number to hours, minutes, second, day, year?
let givenNumber = 114512552;
// milliseconds?
let date = new Date(givenNumber);
console.log(date.getHours(), date.getMinutes(), date.getSeconds(), date.getDay(), date.getFullYear());



// 3. Write a JavaScript program to pass a 'JavaScript function' as parameter.
function doSomethingWithInput(input, doSomething) {
    if(typeof(doSomething) !== "function") {
        throw new Error("doSomething should be a callback function");
    }
    doSomething(input);
}
doSomethingWithInput("Showing an alert...", window.alert);



// 4. Write a JavaScript function to apply Bubble Sort algorithm?
function bubbleSort(input) {
    if(!Array.isArray(input)) {
        throw new Error("Please provide an array to sort.");
    }
    if(input.length === 0 || input.length === 1) {
        return input;
    }

    let swapDone = true;
    while(swapDone) {
        swapDone = false;
        for(let i = 1; i < input.length; i++) {
            if(input[i-1] > input[i]) {
                let temp = input[i];
                input[i] = input[i-1];
                input[i-1] = temp;
                swapDone = true;
            }
        }
    }

    return input;
}

bubbleSort([]);
bubbleSort([23]);
bubbleSort([1, 6, 7, 3, 2279, 9, 4, 7, 12, 77, 32, 64, 27, 98, 38, 7, 4, 12, 787, 23, 1, 66]);
bubbleSort("a string");



// 5. Write a JavaScript program to find the GCD of two positive numbers using recursion?
function getGCD(a, b) {
    if(typeof(a) !== "number" || typeof(b) !== "number") {
        throw new Error("both a and b should be number.");
    }
    if(b === 0) return a;
    return getGCD(b, a % b);
}
getGCD(20, 10);
getGCD(40, 32);
getGCD(12, 21);
getGCD(11, "20");



// 6. Write a class to insert/delete/get property in object? 
// function to set the the property value. get the object property list.
// Sort an array of object based on property value?assume that the property value is integer. 
// print the sorted array.
class UtilityClass {
    insertPropertyTo(object, property) {
        object[property] = undefined;
    }
    deletePropertyFrom(object, property) {
        delete object[property];
    }
    getPropertyFrom(object, property) {
        return object[property];
    }
    setPropertyTo(object, property, value) {
        object[property] = value;
    }
    getPropertyList(object) {
        return Object.entries(object); // for [key, value] pairs
        // return Object.keys(obj); // for [key] properties
    }
    sortObjectsBy(objects, property) {
        return objects.sort((a, b) => a[property] - b[property]);
    }
}

let utility = new UtilityClass();
let objects = [{}, {}, {}, {}, {}, {}];
utility.insertPropertyTo(objects[0], "value");
utility.insertPropertyTo(objects[1], "value");
utility.insertPropertyTo(objects[2], "value");
utility.insertPropertyTo(objects[3], "value");
utility.insertPropertyTo(objects[4], "value");
utility.insertPropertyTo(objects[5], "value");
console.log(objects);
utility.insertPropertyTo(objects[2], "newData");
utility.insertPropertyTo(objects[2], "willRemove");
utility.insertPropertyTo(objects[3], "anotherData");
utility.insertPropertyTo(objects[3], "data");
console.log(objects);
utility.setPropertyTo(objects[0], "value", 547);
utility.setPropertyTo(objects[1], "value", 26);
utility.setPropertyTo(objects[2], "value", 95);
utility.setPropertyTo(objects[3], "value", 74);
utility.setPropertyTo(objects[4], "value", 239);
utility.setPropertyTo(objects[5], "value", 653);
console.log(objects);
utility.deletePropertyFrom(objects[2], "willRemove");
console.log(objects);
console.log(utility.getPropertyFrom(objects[3], "anotherData"));
console.log(utility.getPropertyFrom(objects[3], "value"));
console.log(utility.getPropertyList(objects[3]));
console.log(utility.sortObjectsBy(objects, "value"));

///////////////////////////////////////////////////////////////////////////////
// using Proxy
///////////////////////////////////////////////////////////////////////////////

let proxy = {
    get(target, prop) {
        if (prop in target) {
          return target[prop];
        } else {
          throw new Error(prop + " property is not available.");
        }
    },
    set(target, prop, val) {
        target[prop] = val;
        return true;
    },
    ownKeys(target) {
        return Object.keys(target);
    },
    deleteProperty(target, prop) {
        delete target[prop];
        return true;
    },
}
let proxyObjects = [new Proxy({}, proxy), new Proxy({}, proxy), new Proxy({}, proxy), new Proxy({}, proxy), new Proxy({}, proxy), new Proxy({}, proxy)];
proxyObjects[0].value = 547;
proxyObjects[1].value = 26;
proxyObjects[2].value = 95;
proxyObjects[3].value = 74;
proxyObjects[4].value = 239;
proxyObjects[5].value = 653;
console.log(proxyObjects);
proxyObjects[2].newData = "random string";
proxyObjects[2].willRemove = "random string";
proxyObjects[3].anotherData = "random string";
proxyObjects[3].data = "random string";
console.log(proxyObjects);
delete proxyObjects[2].willRemove;
console.log(proxyObjects);
console.log(proxyObjects[3].value);
console.log(proxyObjects[3].anotherData);
console.log(Object.getOwnPropertyNames(proxyObjects[3]));
console.log(proxyObjects.sort((a, b) => a.value - b.value));



// 7. write a method to merge two object
// example:
// input {a: 10, b: 'abcd'}, {c: 12, d: 'efgh'}
// output: {a: 10, b: 'abcd', c: 12, d: 'efgh'}
// if you have multiple idea, write them all, but no more than three.
function mergeObject(objA, objB) {
    return {...objA, ...objB};
}
function mergeObject(objA, objB) {
    return Object.assign({}, objA, objB);
}
function mergeObject(objA, objB) {
    let result = {};

    for (let key in objA) {
        result[key] = objA[key];
    }
    for (let key in objB) {
        result[key] = objB[key];
    }

    return result;
}
// here we can check and confirm objA and objB both are objects. but we can omit it and see some interesting results.

mergeObject(
    {
        prop1: "Test",
        prop2: "Object",
    },
    {
        prop3: "Another",
        prop4: "Object",
    });



// 8. given an array of integer, write a function to calculate the sum of squares of the values. you can't use any loop.
function getSumOfSquares(values) {
    if(!Array.isArray(values)) {
        throw new Error("Please provide an array to get sum of squares.");
    }
    return values.reduce((previousValue, currentValue) => {
        return previousValue + (currentValue * currentValue);
    }, 0);
}
getSumOfSquares([1, 2, 3]);



// 9. you are given a string with some space separated words.
// write a function to reverse the words inside the string.
// input: 'JS is cool'
// output: 'cool is JS'
function reverseStringBySpace(input) {
    if (typeof input !== "string") {
      throw new Error("input should be a string.");
    }
    return input.split(' ').reverse().join(' ');
}
reverseStringBySpace('JS is cool');



// 10. Let's say child is an object, which inherits from object parent. How to check if a property of child is not inherited but it's own.
// write a function which will take an object and property name and return if the object has this property by it's own.
function isOwnProperty(obj, propName) {
    if(!(typeof(obj) === "object" && typeof(propName) === "string")) {
        throw new Error("Provide a object and a key as string.");
    }

    return obj.hasOwnProperty(propName);
}

class MyDate extends Date {
    typeOfDate = "MyDate type Date"
}
let myDate = new MyDate();
isOwnProperty(myDate, "typeOfDate");
isOwnProperty(myDate, "notAvailable");
isOwnProperty(myDate, "getDate");


// 11. Make a client side app for chatting. Use standard WebSocket servers
// ####   https://github.com/sakhawat-nss/demo-chat.git
