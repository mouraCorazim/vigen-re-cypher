const Assert = require('assert').strict

const { Characters,
        Cypher,
        Message,
        Utils } = require('../Api.js')

const key = require('../mocks/key.json')
const message = require('../mocks/message.json')

const stringfyAfterEncode    = Utils.compose(String.fromCharCode, Cypher.crypt)
const sanitizeAfterTakeCodes = Utils.compose(Characters.takeCodes, Characters.sanitize)
const spledCodeMessage       = sanitizeAfterTakeCodes(message.VALUE)
const spledCodeKey           = sanitizeAfterTakeCodes(key.VALUE)

const encodedMessage = 
  Utils.zip(spledCodeMessage, spledCodeKey, Cypher.keyToZipReceiver)
       .map(stringfyAfterEncode)
       .join("")

const stringfiedSpledCodeKey     = spledCodeKey.toString()
const stringfiedSpledCodeMessage = spledCodeMessage.toString()

Assert.strictEqual(stringfiedSpledCodeKey, key.STRINGFIED_CODES)

Assert.strictEqual(stringfiedSpledCodeMessage, message.STRINGFIED_DECODED_CODES)

Assert.strictEqual(encodedMessage, message.VIGENERE_ENCODED)

console.log("Encode test - DONE!!")