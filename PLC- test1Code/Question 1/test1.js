var fs = require('fs');
var finalTokenLength;


function read(file, cb) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (!err) {
        cb(data.split('\n'))
    } else {
        console.log(err)
    }
  });
}

read('something.txt', function(data) {
  console.log(data.length)
  finalTokenLength = new Array(data.length);

  finalTokenLength.fill(0);
  processJavaStyleStringLiterals(data)
  processCStyleIntegerLiterals(data)
  processCStyleCharacterLiterals(data)
  processCStyleFloatingPointLiterals(data)
  processNonAlphanumericSpecialSymbols(data)
  processPerlStyleIdentifiers(data)
  printArray()
});


function processCStyleCharacterLiterals(documentStrings) {

console.log(documentStrings)
  var pass = true

  documentStrings.forEach(function (value, i) {
    value = value.replace(/(\r\n|\n|\r)/gm, "");
    console.log(value.length)
    var escapeCounter= 0
    var even = false

    // main string symbol for my code is ' so "
    // stands out better cause ya know java
    // get each string then test it here
    // since we are looking for string literals we
    //need to only look at string that have a '"'
    if ( value.includes("'") ) {
      // console.log(value)
      // console.log(value.charAt(0))
      // console.log(value.charAt(3))
      // console.log(value.length)
      // console.log(value.charAt(value.length - 2))
      // got words here check beginning and then end
      console.log(value.charAt(0))
      console.log(value.charAt(value.length-1))
    if ( value.charAt(0) == "'" && value.charAt(value.length-1) == "'" ) {
      // need to check if theres one escape that there are an even number else invalid string
      for (let x = 0; x < value.length; x++) {
        if(value.charAt(x) == '\\') escapeCounter++;
      }
      even = escapeCounter % 2 == 0;

      if ( ! even )
        pass = false
      // else you pass and this value needs to be kept track of and is valid
      else {
        finalTokenLength[i] = 1
      }


      //  if ( value.match(new RegExp("\\", "g")) ) {
      //   escapeCounter++;
      //   console.log(escapeCounter)
      //  }
      //both starts and ends with double quotey boi
    }
    else if ( value.charAt(0) == '"' && value.charAt(value.length) + 1 == '"' ) {
      console.log('heh')
     }
    }
      //console.log(value, i)

});

var final = pass ? 'processed': 'failed'
var finalMsg = 'processCStyleCharacterLiterals has ' + final
console.log(finalMsg)

} // done

function processCStyleIntegerLiterals(documentStrings) {
// TODO: make sure only grabbing certain ones to optimize processing
var pass = true
validHexNumbersAndLetter = ['A','B','C','D','E','F','a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9'];
validSolos = ['u','a','l',]
validDuos = ['ul','LL','Ul','uL','UL']
validTrios = ['ull','I64','ui64','Ull','i64','uI64','uLL','Ui64'];


  documentStrings.forEach(function (value, i) {
    var hasHexBase = false

    console.log(value)
    //console.log('startvalue', value.length)
    // strip new line text
    value = value.replace(/(\r\n|\n|\r)/gm, "");
    //console.log('end', value.length)

    //#0x8a44000000000040Ui64;
    if ( value.charAt(0) == '0' && ( value.charAt(1) == 'x'  ||  value.charAt(1) == 'X' )) {
      hasHexBase = true
    }
    // value either starts with hex base or it doesnt process diff
    // has 0X and then other stoof
    if ( hasHexBase ) {
      // check for valid letters and or number
      for (let x = 2; x < value.length; x++) {
        //console.log(value.charAt(x))
        if(validHexNumbersAndLetter.includes(value.charAt(x))) {
          // if string contains the above array then were good else we are either
          // dont really need to do anythign ghere
          pass = true
        }
        else if ( !validHexNumbersAndLetter.includes(value.charAt(x)) && value.length > x ){
          // figure out difference and start comparing means weve run out of numbers and now to exponenets
          var diff = value.length - x
          // console.log('diff',diff)
          // console.log('valeu',value)
          if ( diff > 3) {
            pass = false
            x = 99
          }
          else if ( diff == 3 ) {
            // take the last three strings combine and compare
            var trio = value.charAt(x) + value.charAt(x + 1) + value.charAt(x + 2)
            if( validTrios.includes(trio) ) {
              x = 99
              pass = true
            }
            else {
              x = 99
              pass = false
            }
          }
          else if ( diff == 2 ) {
            // take the last two strings combine and compare
            var duo = value.charAt(x) + value.charAt(x+1)

            if( validDuos.includes(duo) ){
              x = 99
              pass = true
            }
            else {
              x = 99
              pass = false
            }
          }
          else if ( diff == 1 ) {
            console.log(value.charAt(x))
            if( validSolos.includes(value.charAt(x)) ) {
              x = 99
              pass = true
            }
            else {
              x = 99
              pass = false
            }
          }
        }
      }
      var final = pass ? 'processed': 'failed'
      var finalMsg = 'processCStyleIntegerLiterals has ' + final
      console.log(finalMsg)
    }
    //non hex based so dont need to check boiiii take second half
    else {
      // non hex base
      for (let x = 0; x < value.length; x++) {
        console.log(value.charAt(x))
        if(validHexNumbersAndLetter.includes(value.charAt(x))) {
          // if string contains the above array then were good else we are either
          // dont really need to do anythign ghere
          pass = true
        }
        else if ( !validHexNumbersAndLetter.includes(value.charAt(x)) && value.length > x ){
          // figure out difference and start comparing means weve run out of numbers and now to exponenets
          var diff = value.length - x
          if ( diff > 3) {
            return pass = false
          }
          else if ( diff == 3 ) {
            // take the last three strings combine and compare
            var trio = value.charAt(x) + value.charAt(x + 1) + value.charAt(x + 2)
            if( validTrios.includes(trio) ){
              x = 99
              pass = true
            }
            else {
              x = 99
              pass = false
            }
          }
          else if ( diff == 2 ) {
            // take the last two strings combine and compare
            var duo = value.charAt(x) + value.charAt(x+1)

            if( validDuos.includes(duo) ){
              x = 99
              pass = true
            }
            else {
              x = 99
              pass = false
            }
          }
          else if ( diff == 1 ) {
            if( validSolos.includes(value.charAt(x)) ){
              x = 99
              pass = true
            }
            else {
              x = 99
              pass = false
            }
          }
        }
      }
    }

    if(pass)
     finalTokenLength[i] = 1
  });
} // done

function processJavaStyleStringLiterals(documentStrings) {
  var pass = true

    documentStrings.forEach(function (value, i) {
      var escapeCounter= 0
      var even = false

      // main string symbol for my code is ' so "
      // stands out better cause ya know java
      // get each string then test it here
      // since we are looking for string literals we
      //need to only look at string that have a '"'
      if ( value.includes('"') ) {
        // console.log(value)
        // console.log(value.charAt(0))
        // console.log(value.charAt(3))
        // console.log(value.length)
        // console.log(value.charAt(value.length - 2))
        // got words here check beginning and then end
      if ( value.charAt(0) == '"' && value.charAt(value.length - 2) == '"' ) {
        // need to check if theres one escape that there are an even number else invalid string
        for (let x = 0; x < value.length; x++) {
          if(value.charAt(x) == '\\') escapeCounter++;
        }
        even = escapeCounter % 2 == 0;

        if ( ! even )
          pass = false
        // else you pass and this value needs to be kept track of and is valid
        else {
          finalTokenLength[i] = 1
        }


        //  if ( value.match(new RegExp("\\", "g")) ) {
        //   escapeCounter++;
        //   console.log(escapeCounter)
        //  }
        //both starts and ends with double quotey boi
      }
      else if ( value.charAt(0) == '"' && value.charAt(value.length) + 1 == '"' ) {
        console.log('heh')
      }
      }
        //console.log(value, i)

  });

  var final = pass ? 'processed': 'failed'
  var finalMsg = 'processJavaStyleStringLiterals has ' + final
  console.log(finalMsg)

} // done

function processCStyleFloatingPointLiterals(documentStrings) {

FloatDouble = ['L','F']
exPWND = ['E','-','e']
validNumbers = ['0','1','2','3','4','5','6','7','8','9','-','.']

  // -2.5e-3
  documentStrings.forEach(function (value, i) {
    var pass = false
    var negativeCounter = false
    var decimalCounter = 0
    var hasE = false

    console.log(value)
    value = value.replace(/(\r\n|\n|\r)/gm, "");

    // check for valid letters and or number
    for ( let x = 0; x < value.length; x++ ) {

      // if validNumbers
      if( validNumbers.includes(value.charAt(x)) && !hasE) {
        console.log(value.charAt(x))
        // no matter what count a negative as a valid value
        // catch double negatives tis illegal
        if( x == 0) negativeCounter = true
        else if (value.charAt(x) == '-') {
          pass = false
          x = 99
        }
        // double . check period pooh
        if (value.charAt(x) == '.' && decimalCounter == 0) decimalCounter ++
        else if ( value.charAt(x) == '.' && decimalCounter != 0 ) {
          pass = false
          x = 99
        }
        pass = true
      }

      else if ( (!validNumbers.includes(value.charAt(x)) || hasE) && value.length > x ) {
        console.log(value.charAt(x))
        var diff = value.length - x
        // where we are geting into exPWND or FloatDouble
        // so if the diff is one then you can just check FloatDouble
        if ( diff == 1 && !hasE ) {
          console.log(value.charAt(x))
          if( FloatDouble.includes(value.charAt(x)) ) {
            x = 99
            pass = true
          }
          else {
            x = 99
            pass = false
          }
        }
        else {
          hasE = true
          if( diff > 2 ) {
            // if this char is an e check for its syntax
            if ( value.charAt(x) == 'e' || value.charAt(x) == 'E' ) {
              if( exPWND.includes(value.charAt(x)) ) {
                pass = true
              }
            }
          }
          else if ( hasE && diff == 1 ) {
            if( validNumbers.includes(value.charAt(x)) ) {
              pass = true
            }
            else {
              x = 99
              pass = false
            }
          }
          else if ( hasE && diff != 1 && negativeCounter == 1 ) {
            if( exPWND.includes(value.charAt(x)) ) {
              pass = true
            }
          }
          else {
            x = 99
            pass = false
          }
        }
      }
    }
    var final = pass ? 'processed': 'failed'
    var finalMsg = 'processCStyleIntegerLiterals has ' + final
    console.log(finalMsg)

    //non hex based so dont need to check boiiii take second half

    if(pass) finalTokenLength[i] = 1
  });

} // done

function processNonAlphanumericSpecialSymbols(documentStrings) {
  var pass = false

  // solos
  validNonAplhaSolos = ['+','=','-','/','*','%','a','b','c','d']
  // duos
  validNonAplhaDuos = ['++','--','&&','||']


  documentStrings.forEach(function (value, i) {
    value = value.replace(/(\r\n|\n|\r)/gm, "");
    var size = value.length

      for (let x = 0; x < value.length; x++) {
      console.log(value)

      if( size == 2 ) {
        var duo = value.charAt(x) + value.charAt(x+1)
        if( validNonAplhaDuos.includes(duo)) {
            x = 99
            pass = true
        }
        else {
          x = 99
          pass = false
        }
      }

      else if( size == 1 ) {
        if( validNonAplhaSolos.includes(value.charAt(x))) {
          x = 99
          pass = true
        }
        else {
          x = 99
          pass = false
        }
      }

      else {
        x = 99
        pass = false
      }
    }
    if( pass )
      finalTokenLength[i] = 1
  })

  var final = pass ? 'processed': 'failed'
  var finalMsg = 'processCStyleIntegerLiterals has ' + final
  console.log(finalMsg)
} // done

function processPerlStyleIdentifiers(documentStrings) {
  var pass = false
  var match = false

  documentStrings.forEach(function (value, i) {
    value = value.replace(/(\r\n|\n|\r)/gm, "");

    // regex is a bit faulty when it comes to periods so just ot be sure only filter through things that match
    // nvm i fixed it with the $
    let regex = /(%|@|\$).+([A-Z,a-z,0-9,_])$/g;
    pass = value.match(regex);

    if( pass )
      finalTokenLength[i] = 1

  })
  var final = pass ? 'processed': 'failed'
  var finalMsg = 'processCStyleIntegerLiterals has ' + final
  console.log(finalMsg)
} // done

/* processPerlStyleIdentifiers
// ------ processPerlStyleIdentifiers ------ //
//(%|@|\$)?([A-Z,a-z,0-9,_]+)
// A Perl identifier is a name used to identify a variable, function, class, module, or other objects.
// A Perl variable name starts with either $, @ or % followed by zero or more letters, underscores, and digits (0 to 9).
// so need to start with either $, @ or %  then can be number letts or underscores
//(%|@|\$)?([A-Z,a-z,0-9,_]+) regex */

/* processNonAlphanumericSpecialSymbols
// ------ processNonAlphanumericSpecialSymbols ------ //
// – Increment ++
// – Decrement --
// – Logical And &&
// – Logical Or ||
// - Addition +
// – Assignment =
// – Subtraction -
// – Modulo Operator %
// – Division /
// – Multiplication *
// – Logical Not !
// – Open Code Block {
// – Close Code Block }
// – Open Function parameter (
// – Close Function parameter ) */

/* processCStyleFloatingPointLiterals
// ------ processCStyleFloatingPointLiterals ------ //
// 15.75
// 1.575E1   = 15.75
// 1575e-2   = 15.75
// -2.5e-3   = -0.0025
// 25E-4     =  0.0025
// 10.0L   Has type long double
// 10.0F   Has type float
// .0075e2
// 0.075e1
// .075e1
// 75e-2 */

/* processCStyleFloatingPointLiterals
// ------ processCStyleIntegerLiterals ------ //
// int                 dec_int    = 28;
// unsigned            dec_uint   = 4000000024u;
// long                dec_long   = 2000000022l;
// unsigned long       dec_ulong  = 4000000000ul;
// long long           dec_llong  = 9000000000LL;
// unsigned long long  dec_ullong = 900000000001ull;
// __int64             dec_i64    = 9000000000002I64;
// unsigned __int64    dec_ui64   = 90000000000004ui64;
//  Octal Constants
// int                 oct_int    = 024;
// unsigned            oct_uint   = 04000000024u;
// long                oct_long   = 02000000022l;
// unsigned long       oct_ulong  = 04000000000UL;
// long long           oct_llong  = 044000000000000ll;
// unsigned long long  oct_ullong = 044400000000000001Ull;
// __int64             oct_i64    = 04444000000000000002i64;
// unsigned __int64    oct_ui64   = 04444000000000000004uI64;
// Hexadecimal Constants
// int                 hex_int    = 0x2a;
// unsigned            hex_uint   = 0XA0000024u;
// long                hex_long   = 0x20000022l;
// unsigned long       hex_ulong  = 0XA0000021uL;
// long long           hex_llong  = 0x8a000000000000ll;
// unsigned long long  hex_ullong = 0x8A40000000000010uLL;
// __int64             hex_i64    = 0x4a44000000000020I64;
// unsigned __int64    hex_ui64   = 0x8a44000000000040Ui64; */

/* processCStyleFloatingPointLiterals
// ------ processCStyleCharacterLiterals ------ //
// TODO add theses belwo to processCStyleCharacterLiterals
// \a	Bell (alert)
// \b	Backspace
// \f	Form feed
// \n	New line
// \r	Carriage return
// \t	Horizontal tab
// \v	Vertical tab
// \'	Single quotation mark
// \"	Double quotation mark
// \\	Backslash
// \?	Literal question mark
// \ ooo	ASCII character in octal notation
// \x hh	ASCII character in hexadecimal notation
// \x hhhh */



function printArray() {
  // finally lol
  console.log(finalTokenLength)
  console.log(finalTokenLength)
  console.log(finalTokenLength)
  console.log(finalTokenLength)
}

// TEST FILE
// $name_9890_hey
// 04000000000UL
// "heys"
// +
// 1.575E1
// 'A'