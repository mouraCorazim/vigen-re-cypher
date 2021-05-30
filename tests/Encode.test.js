const { Characters,
        Cypher,
        Message,
        Utils } = require('../Api.js')

const key = require('../mocks/key.json')
const message = require('../mocks/message.json')

const sanitizedMessage    = Characters.sanitilize(message.VALUE)
const spledCodeMessage    = Characters.takeCodes(sanitizedMessage)
const sanitizedKey        = Characters.sanitilize(key.VALUE)
const spledCodeKey        = Characters.takeCodes(sanitizedKey)
const stringfyAfterEncode = Utils.compose(String.fromCharCode, Cypher.crypt)

const encodedMessage = 
  Utils.zip(spledCodeMessage, spledCodeKey, Cypher.keyToZipReceiver)
       .map(stringfyAfterEncode)
       .join("")

const stringfiedSpledCodeKey     = spledCodeKey.toString()
const stringfiedSpledCodeMessage = spledCodeMessage.toString()

console.assert(stringfiedSpledCodeKey === key.STRINGFIED_CODES,
  `${stringfiedSpledCodeKey}
                not equal 
    ${key.STRINGFIED_CODES}
  `)

console.assert(stringfiedSpledCodeMessage === message.STRINGFIED_DECODED_CODES,
  `${stringfiedSpledCodeMessage}
                not equal 
    ${message.STRINGFIED_DECODED_CODES}
  `)

console.assert(sanitizedMessage === message.SANITIZED,
  `${sanitizedMessage} not equal ${message.SANITIZED}`)

console.assert(encodedMessage === message.VIGENERE_ENCODED, 
  `${encodedMessage} not equal ${message.VIGENERE_ENCODED}`)

console.log("Encode test - DONE!!")