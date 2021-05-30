const FileSystem = require('fs')

function argsMap(slicedArgs){
  return { flag    : slicedArgs[0],
           filePath: slicedArgs[1],
           key     : slicedArgs[2]}
}

function isValidFlag(flag){
  return flag.length && flag === "--encode" || flag === "--decode"
}

function areCorrect(slicedArgs){
  let flag     = slicedArgs[0]
  let filePath = slicedArgs[1]
  let key      = slicedArgs[2] 

  return slicedArgs.length === 3 && isValidFlag(flag)
    ? argsMap(slicedArgs)
    : {}
}

module.exports = {
  areCorrect
}