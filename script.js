// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Global variables
var passwordLength = 8 // length of password
var useLowerCaseLtrs; 
var useUpperCaseLtrs; 
var useNumCharacters; 
var useSpecialCharacters; 
var numCharacters = ["0","1","2","3","4","5","6","7","8","9"];
var lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperCase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var specialCharacters = ["!",'"',"#","$","%","&","/'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\","]","^","_","`","{","|","}","~" ];
var passwordCharacters = []; // array of all the characters to generate password
var finalPassword = [];
var isError = false; 
var cancel = false // cancels all other prompts if true
// RegExp to test if prompt value contains any non-digit values
// RegExp source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes
var onlyDigits = /^\d+$/;

// Prompt user for length of password
function getPasswordLength() {
  passwordLength = prompt("How many characters?\nMust be a number bewteen 8 and 128")
  if(onlyDigits.test(passwordLength)){
    input = parseInt(passwordLength)
    while (
      passwordLength < 8 ||
      passwordLength > 128
    ) {
      passwordLength = parseInt(
        prompt("Password length must be a number between 8 and 128 characters")
      );
      // Prompt was returning NaN after selecting "cancel". Used isNaN to catch and cancel prompts based on NaN type.
      // isNaN source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
      if (isNaN((passwordLength))) {
        cancel = true
        break
      } 
    }
    return parseInt(passwordLength)
  } else if (passwordLength === null) {
      cancel = true
  }  else {
    getPasswordLength()
  }
}

// Prompt user to indicate use of lower case in password and concat array if true
function lowerCasePrompt() {
  useLowerCaseLtrs = confirm("Do you want lower case letters?");
  if (useLowerCaseLtrs) {
    passwordCharacters = passwordCharacters.concat(lowerCase);
  } 
}

// Prompt user to indicate use of upper case in password and concat array if true
function upperCasePrompt() {
  useUpperCaseLtrs = confirm("Do you want upper case?");
  if (useUpperCaseLtrs) {
    passwordCharacters = passwordCharacters.concat(upperCase);
  } 
}

// Prompt user to indicate use of numbers in password and concat array if true
function numCharactersPrompt() {
  useNumCaseLtrs = confirm("Do you want to include numbers?");
  if (useNumCaseLtrs) {
    passwordCharacters = passwordCharacters.concat(numCharacters);
  } 
}

// Prompt user to indicate use of digits in password and concat array if true
function specialCharactersPrompt() {
  useSpecialCharacters = confirm(
    "Do you want to include special characters?"
  );
  if (useSpecialCharacters) {
    passwordCharacters = passwordCharacters.concat(specialCharacters);
  } 
}

// Generate random number
function randomNumber() {
  var min = 0;
  var max = passwordCharacters.length - 1;
  var random = Math.floor(Math.random() * (max - min + 1) + min);
  return random
}

// Use passwordCharacters array and a random number to generate a password 
function createPassword() {
  for (var i = 0; i < passwordLength; i++) {
    var random = randomNumber()
    var char = passwordCharacters[random]
    finalPassword.push(char)
  }
}

// Hanlde errors
function setError() {
  if (
    !useLowerCaseLtrs &&
    !useUpperCaseLtrs &&
    !useNumCharacters &&
    !useSpecialCharacters
  ) {
    isError = "Must select at least one of the options to generate a password.";
  } else {
    isError = false;
  }
}

function generatePassword() {
  // Reset global variables
  cancel = false;
  isError = false;
  passwordCharacters = [];
  finalPassword = [];
  getPasswordLength();

  if(cancel){
      return "Your Secure Password"
  } else {
      lowerCasePrompt();
      upperCasePrompt();
      numCharactersPrompt();
      specialCharactersPrompt();
      setError()
      if(isError){
        alert(isError)
      } else {
          createPassword();
          return finalPassword.join("");
      }
  }
  return "Your Secure Password";
}
