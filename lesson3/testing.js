/**
 * 
 * Input - a string
 * Output - a new string
 * Rules - expansion of string - numeric values represent  the occurence of each letter before that numeric value
 * - no letters to repeat? return empty string
 * - empty string? return empty string
 * - no digits? return original string
 * - if multiple digits in a row, use last digit before a letter to repeat the letter
 * 
 * Algorithm
 create result string

 create current repeat number variable and set to 0

 iterate through the arg string
    if current char is a number
      reassign repeat variable to current char
    else if current char is a letter
      add the current char repeated repeat times to the result string

 * return the result string
 * 
 */

function expansion(str) {
  if([...str].every(char => isLetter(char))) return str;
  if([...str].every(char => !isLetter(char))) return '';
  if(str.length === 0) return '';

  function isLetter(char) {
    return char.toLowerCase() !== char.toUpperCase();
  }
  
  let result = '';
  let repeat = 1;

  [...str].forEach(char => {
    if(!isLetter(char)) repeat = char;
    else result += char.repeat(repeat);
  });
  return result;
}


console.log(expansion("3D2a5d2f"));