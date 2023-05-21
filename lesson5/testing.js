const errorMessage = 'There is no possible number that fulfills those requirements.';

function featured(number) {
  if (number > 9876543200) {
    return errorMessage;
  }
  number += 1;
  while (true) {
    if (isFeaturedNumber(number)) {
      break;
    }
    number += 1;
  }
  return number;
}

function isFeaturedNumber(number) { //bug in the first part of the compound conditional expression.
  if ((number % 2 === 1) && (number % 7 === 0) && (noRepeatingDigits(number))) {
    return true;
  } else {
    return false;
  }
}

// function noRepeatingDigits(number) {  //inner for loop right initialization needs to change.
//   let numberString = String(number);
//   for (let left = 0; left < numberString.length - 1; left += 1) {
//     for (let right = left + 1; right < numberString.length; right += 1) {
//       // console.log(`Left : ${numberString[left]}`);
//       // console.log(`right : ${numberString[right]}`);
//       if (numberString[left] === numberString[right]) {
//         return false;
//       }
//     }
//   }
//   return true;
// }

function noRepeatingDigits(number) {

  let stringNumber = String(number);

  //creates a "Set" object, which contains one of each unique character in the input string 
  // array / array like object etc. It's a new type of object we haven't been taught about yet.
  let uniqueCharactersSet = new Set(stringNumber);

  if (stringNumber.length === uniqueCharactersSet.size) { //set size is basically the same as the length property of strings and arrays
    return true;
  } else {
    return false;
  }
}

// console.log(isFeaturedNumber(1023547)); 

console.log(featured(12));      //21
console.log(featured(20)); //21
console.log(featured(21));  //35
console.log(featured(997)); //1029
console.log(featured(1029));  //1043
console.log(featured(999999));
console.log(featured(999999987));
console.log(featured(9876543186));
console.log(featured(9876543200));
console.log(featured(9876543201));