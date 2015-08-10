#!/usr/local/bin/node
var utils = require('./cipherUtils')


// ======> super basic block cipher in Javascript <====== //

// plainText to be encrypted
var plainText = "Fight for a just cause, love your fellow man, live a good life";

// key
var key = "filoli";


// array of binary 'blocks' representing each letter
// for plaintext and (encryption) key
var bPlainText = utils.makeBinaryString( plainText );
var bKey = utils.makeBinaryString( key );


var keyLen = bKey.length;
var pTextLen = bPlainText.length;

// adds padding if neccessary to bplainText
bPlainText = utils.pad(bPlainText, bKey);


var encrypt = function(plainText, key){
  var kLen = key.length;
  var encrypted = [];
  var copyPText = plainText.slice(0);
  while( copyPText.length > 0 ){
    var chunk = copyPText.splice(0, kLen);
    var XORed = utils.xor(chunk.join(''), key.join(''));
    encrypted.push(XORed.match(/.{1,8}/g))
  }
  return encrypted;
}


// var text = ['01000110', '01101001', '01100111', '01101000', '01110100', '00100000'];
// var test = encrypt(text, bKey);
// console.log('text: ', text, '\n', 'test encryption: ', test, '\n', 'key: ', bKey);

// var xorTest = utils.xor('111011', '110101');
// console.log(xorTest, 'expected: 00111');


// console.log(bPlainText);
// console.log(bKey);