const Assert = require('assert').strict
const { Characters,
        Cypher,
        Message,
        Utils } = require('../Api.js')

const key = require('../mocks/key.json')
const message = require('../mocks/message.json')

const stringfyAfterDecode = Utils.compose(String.fromCharCode, Cypher.decrypt)

const decodedMessage =
  Utils
    .zip(message.ENCODED_CODES, key.CODES, Cypher.keyToZipReceiver)
    .map(stringfyAfterDecode)
    .join("")

Assert.strictEqual(decodedMessage, message.VIGENERE_DECODED)

console.log("Decode test - DONE!!")