// Given the following data structure, write some code that defines an object where the key 
//is the first item in each subarray, and the value is the second but turned into an object,

  //if the 2nd element of the subarray is a primitive, the object should contain a keyvalue pair 
  //with the primitve as the key and as the value. 
  //if the 2nd element of the subarray is an array, then the object should have a key value 
  //pair for each element of the array.


// Input - [['a', 1,], ['b', 'two'], ['sea', [1, 2, 5]], ['D', ['a', 'b', 'c']]]

// Output - 
//{'a' : {'1' : 1}, 'b' : {'two' : 'two}, sea : {'1': 1, '2': 2, '5': 5} , 'D' : {'a' : 'a', 'b' : 'b', 'c' : 'c'} }

/**
 * rules - if second element of subArr is a primitive, create an object with 1 key value pair primitive : primitive
 * - if second element of subArr is an array, create an object with multiple key value pairs, elemenet : element
 * 
 * Data structure - array and objects
 * 
 * Algorithm.
 * 
 * create an object = resultObj 
 * 
 * iterate through each element of the input array
 *    create valueObj {}
 * 
 *    check if the current sub array at index 1 is an array
 *      if it is an array
 *         iterate through that array
 *            add a key value pair to valueObj where the key is the element, and the value is the element of this array
 * 
 *      if it isn't an array - do some different stuff
 *            add a key value pair to valueObj   subArray at index 1 : subArray at index 1 
 * 
 *    set resultObj property the current element at index 0
 *    set the value of that property to be valueObj
 */

let arr = [['a', 1,], ['b', 'two'], ['sea', [1, 2, 5]], ['D', ['a', 'b', 'c']]];

let resultObj = {};

arr.forEach(subArr => {
  let valueObj = {};

  if(Array.isArray(subArr[1])) {
    subArr[1].forEach(element => valueObj[element] = element);
  } else {
    valueObj[subArr[1]] = subArr[1];
  }

  resultObj[subArr[0]] = valueObj;
});

console.log(resultObj);
