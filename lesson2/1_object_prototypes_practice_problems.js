/**
 * Write a function that searches the prototype chain of an object for a given property and assigns it a new value. 
 * If the property does not exist in any of the prototype objects, the function should do nothing. 
 * The following code should work as shown:
 * 
 * Input - an object, a property to mutate, and a value to set as the new value of the property when found
 * Output - mutate the object in the prototype chain, assining it a new value, when when the property is found as an "own" property.
 * Rules - do nothing if the property does not exist in any of the prototype objects. 
 *

create a searchObj Variable and initialize to the arg1 reference

iterate while search Obj is not Null
  if the searchObj has arg 2 as a property
    reassign the property's value to arg 3
    break the loop
  otherwise
    reassign the searchObj to the prototype of the current searchObj
 */


function assignProperty(obj, property, value) {
  let searchObj = obj;

  while (searchObj) {
    if (searchObj.hasOwnProperty(property)) {
      searchObj[property] = value;
      break;
    }
    else searchObj = Object.getPrototypeOf(searchObj);
  }
}

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false