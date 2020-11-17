const { match } = require('assert');
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

read('tester.txt', function(data) {
  finalTokenLength = new Array(data.length);
  finalTokenLength.fill(0);
  for (let lopp = 0; lopp < data.length; lopp++) {

    if( !data[lopp].includes('if') && !data[lopp].includes('while') && !data[lopp].includes('=') )
      mathDetect(data[lopp])

    else if(data[lopp].includes('if'))
      ifDetect(data[lopp])

    else if(data[lopp].includes('while'))
      whileDetect(data[lopp])

    else if (!data[lopp].includes('while') && !data[lopp].includes('if') && data[lopp].includes('=') ) {
      assignmentDetect(data[lopp])
    }

  }

  //ifDetect(data)
  //whileDetect(data)
  //assignDetect(data)
  //mathDetect

});


function ifDetect(documentStrings) {
  var ran = false
  if(! ran ) {
    console.log('ifDetect',documentStrings)

    ran = true
    var syntax = false
    var isIf = false
    var openParen = false
    var closeParen = false
    var openBracket = false
    var closeBracket = false
    value = documentStrings.replace(/(\r\n|\n|\r)/gm, "");
      isIf = true
      // need to check if theres one escape that there are an even number else invalid string
      for ( let x = 2; x < value.length; x++ ) {
        if ( value.charAt(0) == "i" && value.charAt(1) == "f" ) {

            if( !openParen ) {
              if( (value.charAt(x) == '' || value.charAt(x) == '(') && !openParen ) {
                openParen = true
              }
              else if( (value.charAt(x) != '' || value.charAt(x) == '(') && openParen ) {
                return err;
              }
            }
            // got our open paren now need bool stoof
            else {
              var regExp = /\(([^)]+)\)/;
              var matches = regExp.exec(value);
              var length = matches[1].length
              var match = matches[1].trim()

              //analyze match
              var newRegExp = /([A-Z,a-z]).+([=|>|<]).+([A-Z,a-z,0,9])/;
              var matches = null
              var matches = newRegExp.exec(match);

              if( !! matches ) {
                syntax = true
                x = x + length
                newx = x + length

                if( (value.charAt(x) == '' || value.charAt(x) == ')') && !closeParen ) {
                  closeParen = true
                }
                else if( (value.charAt(x) != '' || value.charAt(x) != '{') && openParen ) {
                  if( syntax && isIf && openParen && closeParen && openBracket && closeBracket) {
                    console.log('VALID'); return }
                  else {
                    console.log('INVALID'); return }
                }

                if( closeParen ) {
                  for ( let x = newx; x < value.length; x++ ) {

                    if( !openBracket && !closeBracket ) {
                      if( (value.charAt(x) != '' || value.charAt(x) != '{') && !openBracket )
                        openBracket = true

                        if (openBracket) {
                        var regExpBrack = /\{([^)]+)\}/;
                        var matches = regExpBrack.exec(value);
                        if (!matches) {
                          console.log('INVALID'); return
                        }
                        var length = matches[1].length
                        var match = matches[1].trim()

                        if( !! match )
                          x = x + length

                        if( (value.charAt(x) != '' || value.charAt(x) != '}') && !closeBracket ) {
                          closeBracket = true
                          x = 99
                          y = 99

                        }

                      }
                    }
                  }
                }
            }
        }
      }
    }
  }
} // done

function whileDetect(documentStrings) {
  console.log('whileDetect',documentStrings)
    var syntax = false
    var isWhile = false
    var openParen = false
    var closeParen = false
    var openBracket = false
    var closeBracket = false
    value = documentStrings.replace(/(\r\n|\n|\r)/gm, "");
    isWhile = true
      // need to check if theres one escape that there are an even number else invalid string

      if ( value.charAt(0) == "w" && value.charAt(1) == "h" && value.charAt(2) == "i" && value.charAt(3) == "l" && value.charAt(4) == "e")  {
        for ( let x = 5; x < value.length; x++ ) {

              if( !openParen ) {
                if( (value.charAt(x) == '' || value.charAt(x) == '(') && !openParen ) {
                  openParen = true
                }
                else if( (value.charAt(x) != '' || value.charAt(x) == '(') && openParen ) {
                  return err;
                }
              }
              // got our open paren now need bool stoof
              else {
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(value);
                var length = matches[1].length
                var match = matches[1].trim()

                //analyze match
                var newRegExp = /([A-Z,a-z]).+([=|>|<]).+([A-Z,a-z,0,9])/;
                var matches = null
                var matches = newRegExp.exec(match);

                if( !! matches ) {
                  syntax = true
                  x = x + length
                  newx = x + length

                  if( (value.charAt(x) == '' || value.charAt(x) == ')') && !closeParen ) {
                    closeParen = true
                  }
                  else if( (value.charAt(x) != '' || value.charAt(x) != '{') && openParen ) {
                    if( syntax && isWhile && openParen && closeParen && openBracket && closeBracket) {
                      console.log('VALID'); return }
                    else {
                      console.log('INVALID'); return }
                  }
                  if( closeParen ) {
                    for ( let x = newx; x < value.length; x++ ) {

                      if( !openBracket && !closeBracket ) {
                        if( (value.charAt(x) != '' || value.charAt(x) != '{') && !openBracket )
                          openBracket = true

                          if (openBracket) {
                          var regExpBrack = /\{([^)]+)\}/;
                          var matches = regExpBrack.exec(value);
                          if (!matches) {
                            console.log('INVALID'); return
                          }
                          var length = matches[1].length
                          var match = matches[1].trim()

                          if( !! match )
                            x = x + length

                          if( (value.charAt(x) != '' || value.charAt(x) != '}') && !closeBracket ) {
                            closeBracket = true
                            x = 99
                            y = 99

                          }

                        }
                      }
                    }
                  }
              }
          }
        }
    }
} // done

function assignmentDetect(documentStrings) {
  console.log('assignmentDetect',documentStrings)
  // 3,4,5,6,7
  var valid3s = ['int']
  var valid4s = ['byte','long','char']
  var valid5s= ['short','float', 'String']
  var valid6s= ['double']
  var valid7s= ['boolean']
  var validOps = ['=']
  var validEnds = ['0','1','2;','3;','4','5','6','7','8','9',]

    var validstart = false
    var validName = false
    var validOperator = false
    var validEnd = false
    var validSemi = false
    value = documentStrings.replace(/(\r\n|\n|\r)/gm, "");
    allvalues = value.split(' ')

    for (let index = 0; index <= allvalues.length ; index++) {

      // semi colon appended so juyst check for it with a minus 1
      if( !allvalues[index] ) {
        if (allvalues[index-1].includes(';')) {
          validSemi = true
          typeLength = allvalues[index-1].length
        }
      }
      else
        typeLength = allvalues[index].length


      // type
      if( index == 0 ) {
        if(typeLength == 3) {
          validstart = true
          valid3s.includes(allvalues[index])
        }
        if(typeLength == 4) {
          validstart = true
          valid4s.includes(allvalues[index])
        }

        if(typeLength == 5) {
          validstart = true
          valid5s.includes(allvalues[index])
        }

        if(typeLength == 6) {
          validstart = true
          valid6s.includes(allvalues[index])
        }

        if(typeLength == 7) {
          validstart = true
          valid7s.includes(allvalues[index])
        }
      }
      //name
      if( index == 1 ) {
        var compare = allvalues[index]
        if( !valid3s.includes(compare) || !valid4s.includes(compare) || !valid5s.includes(compare) || !valid6s.includes(compare) || !valid7s.includes(compare) )
          validName = true
      }

      //operator
      if( index == 2 ) {
        var compare = allvalues[index]
        if( validOps.includes(compare) )
          validOperator = true
      }

      //End
      if( index == 3 ) {
        let re = /(\d+)/;
        var match = re.exec(allvalues[index]);
        match = match[0]
        if( validEnds.includes(match) )
          validEnd = true
      }

      if( index == 4 ) {
        var compare = allvalues[index]
        if( compare == ';')
          validSemi = true
      }
    }

    if ( validstart && validName && validOperator && validEnd && validSemi )
      console.log("VALID")
    else
      console.log("INVALID")

    // var validstart = false
    // var validName = false
    // var validOperator = false
    // var validEnd = false
    // var validSemi = false

    // byte (number, 1 byte)
    // long (number, 8 bytes)
    // char (a character, 2 bytes)
    // int (number, 4 bytes)
    // short (number, 2 bytes)
    // float (float number, 4 bytes)

    // double (float number, 8 bytes)
    // boolean (true or false, 1 byte)


  // get first word with regex

} //

function mathDetect(documentStrings) {
  //debugger
  documentStrings = documentStrings.replace('(','')
  documentStrings = documentStrings.replace(')','')
  documentStrings = documentStrings.replace(/(\r\n|\n|\r)/gm, "");

  var pass = false;
  var regExp = /([0-9]+[\\+\\-\\*\\/ \\%]{1}[0-9]+)+([\\+\\-\\*\\/ \\%]{1}[0-9]+)*/;
  var matches = regExp.exec(documentStrings);
//debugger
  if( !!matches && !! matches[0] && matches[0] != ' ' )
    pass = true

  console.log(documentStrings)
    if ( pass )
      console.log("VALID")
    else
      console.log("INVALID")

} // done



// while ( x > 9 ) { x++; }
// if( x > 9 ) { x++; }

// while (conditional) { <code_block> }

// if (conditional) { <code_block> }
// <var> <ident> = <number>;
// <const> <ident> = <number>;

