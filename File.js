const { Characters,
        Cypher,
        Message,
        Utils } = require('./Api.js')

function encode(buffer, key){

  let stringfyAfterEncode = Utils.compose(String.fromCharCode, Cypher.crypt)
  let sanitizeAfterSpled  = Utils.compose(Characters.takeCodes, Characters.sanitize)
  let spledCodeKey = sanitizeAfterSpled(key)

  let message = 
    Array.from(buffer)
         .reduce(Characters.onlyUpperCaseDecimalASCIICode, [])
         .map(Characters.putInVigenereRange)

  let encodedMessage = 
    Utils.zip(message, spledCodeKey, Cypher.keyToZipReceiver)
         .map(stringfyAfterEncode)
         .join("")

  return encodedMessage
}

function decode(buffer, key){

  let stringfyAfterDecode = Utils.compose(String.fromCharCode, Cypher.decrypt)
  let sanitizeAfterSpled  = Utils.compose(Characters.takeCodes, Characters.sanitize)
  let spledCodeKey = sanitizeAfterSpled(key)

  let message = 
    Array.from(buffer)
         .map(Characters.putInVigenereRange)

  let decodedMessage =
    Utils.zip(message, spledCodeKey, Cypher.keyToZipReceiver)
         .map(stringfyAfterDecode)
         .join("")

  return decodedMessage
}

function errorHandler(err, data){
  console.error(err)
}

module.exports = {
  errorHandler,
  encode,
  decode
}