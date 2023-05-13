let collection = [1, 2, 3, 4, 5, 4, 3, 2, 2, 3, 7, 12];
let arr1 = [1, 2, 3, 4, 5, 4, 3, 2, 2, 3, 7, 12];
let arr2 = [1, 2, 3, 4, 5, 4, 3, 2, 2, 3, 7, 12];
let str = 'hhasb';

/** 

Input - 
Output - 
Rules -

Mental Model - 

Data structure -

Algorithm

 */


// //count create a count of occurences object from an array or string
let countObject = [...collection].reduce((countObject, current) => {
  countObject[current] = (countObject[current] + 1 || 1);
  return countObject;
}, {});



//create a nested array of the elements, and their occurances, in order 
//of their appearance in the original collection.
let occurancesInOrder = [...collection].reduce((nestedArr, num) => {
  //remove duplicates 
  if(nestedArr.some(subArr => subArr[0] === num)) return nestedArr;
  
  nestedArr.push([num, countObject[num]]);

  return nestedArr;
}, []);




// //get the count of unique values in a collection
  let unique = new Set([...collection]); 

  unique.size // LENGTH OF THE SET OBJECT


  //let uniqueArr = Array.from(unique);  //create an array from a Set

  // for(let thing of unique) {  //iterate through the values of a set
  //   console.log(thing);
  // }
  // console.log(unique.size); // the equivelant of accessing the length property of a string or array



//Return true if the argument number is prime, or false if not
function isPrime (num) {
  let isPrime = true
  for(let i = 2; i < num; i++) {
    if(num % i === 0) isPrime = false;
    break;
  }
  return isPrime;
}



//Fibbonacci - return fib number at argumnet index
function fibonacci (index) {
  let fib = [1, 1];
  for(let i = 2; i < index; i++) {
    fib.push(fib.shift() + fib.at(-1));
  }
  return fib.at(-1);
}



//create an array with all substrings of a string
let allSubStrs = [];
for(let i = 0; i < str.length; i++) {
  for(let j = i; j < str.length; j++) {
    allSubStrs.push(str.slice(i, j + 1));
  }
}
// console.log(allSubStrs);




//loop through a collection and remove chunks / sentences / groups based on 
//some criteria and put them into an array
let chunks = [];

while(collection.length) {
  for(let i = 0; i < collection.length; i++) {
    if(i === 2) {
      chunks.push(collection.splice(0, i + 1));
      break;
    }
  }
}
// console.log(chunks);



// //find lowest value in an array (assuming the array has arrays or 
//objects nested in it and you can't just use Math.min() )
let lowestValue = [...arr1].reduce((lowest, current) => {
  return current < lowest ? current : lowest;
});