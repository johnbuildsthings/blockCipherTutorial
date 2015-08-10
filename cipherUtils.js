#!/usr/local/bin/node

// seems to be working for converting decimal to binary

var convertToBinary = function(number){
  var parts = [];
  var pad = "00000000"
  while(number>1){
    parts.push(number%2);
    number = Math.floor(number/2);
  }
  parts.push(number);
  var bstring = parts.reverse().join('');
  return pad.substring(0, pad.length - bstring.length) + bstring;
}

var convertToDecimal = function(binaryString){
  var accumulator = 0;
  var pointer = binaryString.length-1;
  while(pointer >= 0){
    accumulator += binaryString[binaryString.length - (pointer+1)]*(Math.pow(2, pointer));
    pointer--;
  }
  return accumulator;
}

// convert string to decimal array

var stringToDecimal = function(str){
  var arrayOfDecimals = [];
  for(var i=0; i<str.length; i++){
    arrayOfDecimals.push(str.charCodeAt(i));
  }
  return arrayOfDecimals;
}



// converts is to an array of binary 'blocks'
exports.makeBinaryString = function(plainText){
  var str = stringToDecimal(plainText);
  var binaryArray = [];
  for(var i=0; i<str.length; i++){
    binaryArray.push(convertToBinary(str[i]));
  }
  return binaryArray;
}


// rebuild of the xor function will return 1 if one 
// but not both of the of the strings is 1
exports.xor = function(str1, str2){
  var result = '';
  for(var i=0; i<str1.length; i++){
    var num1 = Number(str1[i]), 
      num2 = Number(str2[i]);
    if((!!num1 || !!num2) && !(!!num1 && !!num2)){
      result += '1';
    }else{
      result += '0';
    }
  }
  return result;
}


// test if plainText needs to be padded
exports.pad = function(cipherText, key){
  var keyLen = key.length;
  var textLen = cipherText.length;

  if( textLen % keyLen !== 0 ){
    var multiple = Math.ceil(textLen / keyLen);
    var padding = (multiple * keyLen) - textLen;
    while(padding > 0){
      var pad = '00000000';
      cipherText.push(pad);
      padding--;
    }
  }
  return cipherText;
}


// //tests for converting to binary
// console.log(convertToBinary(10), '1010');
// console.log(convertToBinary(37), '100101');
// console.log(convertToBinary(157), '10011101');

//  //tests for converting to decimal
// console.log(convertToDecimal('1010'), '10');
// console.log(convertToDecimal('100101'), '37');
// console.log(convertToDecimal('10011101'), '157');

// //tests creating an array of char codes from a string
// console.log(stringToDecimal("hello").length, '5');
// console.log(stringToDecimal("there world").length, '11');
// console.log(stringToDecimal('jump up, buckle up').length, '18');


// //tests xor function
// console.log(exports.xor("1001", "1000"), '0001');
// console.log(exports.xor('11111', '10011'), '01100');
// console.log(exports.xor('0101010', '1010101'), '1111111');
